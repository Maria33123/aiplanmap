Option Explicit

Dim shell, fileSystem, projectRoot, powershell, command

Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

projectRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
powershell = shell.ExpandEnvironmentStrings("%SystemRoot%") & "\System32\WindowsPowerShell\v1.0\powershell.exe"
command = Quote(powershell) & " -NoProfile -ExecutionPolicy Bypass -File " & _
    Quote(projectRoot & "\scripts\repair-port-3000.ps1")

shell.Run command, 0, False

Function Quote(value)
    Quote = Chr(34) & value & Chr(34)
End Function
