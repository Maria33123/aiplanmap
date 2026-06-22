import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const brandDirectory = path.join(projectRoot, "public", "brand");
const preferredSource = path.join(brandDirectory, "daisy-source.png");
const fallbackSource = path.join(brandDirectory, "daisy-source.png.png");
const sizes = [512, 256, 128, 64, 32, 16];
const safeAreaRatio = 0.7;

async function findSource() {
  try {
    await fs.access(preferredSource);
    return preferredSource;
  } catch {
    await fs.access(fallbackSource);
    return fallbackSource;
  }
}

function isBackgroundPixel(data, index, channels) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  const alpha = channels === 4 ? data[index + 3] : 255;
  const lightest = Math.max(red, green, blue);
  const darkest = Math.min(red, green, blue);

  return alpha === 0 || (darkest >= 218 && lightest - darkest <= 18);
}

function removeEdgeConnectedBackground(data, width, height, channels) {
  const pixelCount = width * height;
  const visited = new Uint8Array(pixelCount);
  const queue = new Uint32Array(pixelCount);
  let head = 0;
  let tail = 0;

  const enqueue = (pixelIndex) => {
    if (visited[pixelIndex]) return;
    if (!isBackgroundPixel(data, pixelIndex * channels, channels)) return;
    visited[pixelIndex] = 1;
    queue[tail++] = pixelIndex;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const pixelIndex = queue[head++];
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    if (x > 0) enqueue(pixelIndex - 1);
    if (x + 1 < width) enqueue(pixelIndex + 1);
    if (y > 0) enqueue(pixelIndex - width);
    if (y + 1 < height) enqueue(pixelIndex + width);
  }

  const output = Buffer.alloc(pixelCount * 4);
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    const sourceIndex = pixelIndex * channels;
    const outputIndex = pixelIndex * 4;
    output[outputIndex] = data[sourceIndex];
    output[outputIndex + 1] = data[sourceIndex + 1];
    output[outputIndex + 2] = data[sourceIndex + 2];
    output[outputIndex + 3] = visited[pixelIndex]
      ? 0
      : channels === 4
        ? data[sourceIndex + 3]
        : 255;
  }
  return output;
}

async function main() {
  const source = await findSource();
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const transparentImage = removeEdgeConnectedBackground(
    data,
    info.width,
    info.height,
    info.channels,
  );
  const trimmedFlower = await sharp(transparentImage, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await Promise.all(
    sizes.map(async (size) => {
      const flowerSize = Math.max(1, Math.round(size * safeAreaRatio));
      const outputPath = path.join(brandDirectory, `daisy-${size}.png`);
      await sharp(trimmedFlower)
        .resize(flowerSize, flowerSize, {
          fit: "contain",
          position: "centre",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .extend({
          top: Math.floor((size - flowerSize) / 2),
          bottom: Math.ceil((size - flowerSize) / 2),
          left: Math.floor((size - flowerSize) / 2),
          right: Math.ceil((size - flowerSize) / 2),
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(outputPath);
      console.log(`Generated ${path.relative(projectRoot, outputPath)}`);
    }),
  );
  console.log(`Source: ${path.relative(projectRoot, source)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
