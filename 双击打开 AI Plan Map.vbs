Option Explicit

Dim shell, fileSystem, projectRoot, powershell, command, exitCode

Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

projectRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
powershell = shell.ExpandEnvironmentStrings("%SystemRoot%") & "\System32\WindowsPowerShell\v1.0\powershell.exe"
command = Quote(powershell) & " -NoProfile -ExecutionPolicy Bypass -File " & _
    Quote(projectRoot & "\scripts\open-site.ps1") & " -Path " & Quote("/finder?lang=zh")

exitCode = shell.Run(command, 0, True)

If exitCode <> 0 Then
    MsgBox "AI Plan Map could not be started." & vbCrLf & _
        "Please check whether Node.js is installed and port 3000 is available.", 16, "AI Plan Map"
End If

Function Quote(value)
    Quote = Chr(34) & value & Chr(34)
End Function

