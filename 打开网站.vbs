Option Explicit

Dim shell, fileSystem, projectRoot, powershell, command, exitCode

Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

projectRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
powershell = shell.ExpandEnvironmentStrings("%SystemRoot%") & "\System32\WindowsPowerShell\v1.0\powershell.exe"
command = Quote(powershell) & " -NoProfile -ExecutionPolicy Bypass -File " & _
    Quote(projectRoot & "\scripts\open-site.ps1")

If WScript.Arguments.Named.Exists("NoOpen") Then
    command = command & " -NoOpen"
End If

exitCode = shell.Run(command, 0, True)

If exitCode <> 0 Then
    MsgBox "AI Price Guide could not be started.", 16, "AI Price Guide"
End If

Function Quote(value)
    Quote = Chr(34) & value & Chr(34)
End Function
