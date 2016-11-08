// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "python-comb-imports" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.compPythonImports', function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;
        var lines = editor.document.getText(selection).split('\n');
        lines.reverse();

        var range = new vscode.Range(selection.start, selection.end);
        var edit = new vscode.TextEdit(range, lines.join('\n'));
        var wsEdit = new vscode.WorkspaceEdit();
        wsEdit.set(editor.document.uri, [edit]);
        vscode.workspace.applyEdit(wsEdit);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;