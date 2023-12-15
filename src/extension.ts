// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
const kebabize = (str:string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-ionic" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-ionic.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-ionic!');
	});
	
	context.subscriptions.push(disposable);
	
	
	disposable = vscode.commands.registerTextEditorCommand('vscode-ionic.kebab', function (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
		if (!textEditor) {
			return;
		}
		
		const doc = textEditor.document;
		
		textEditor.edit(editBuilder  => {
			// vscode.window.showInformationMessage(`textEditor.selections.length: ${textEditor.selection.anchor.isEqual(textEditor.selection.active)}`);
			if(!textEditor.selection.anchor.isEqual(textEditor.selection.active)){
				textEditor.selections.forEach(selection => {
					const token = doc.getText(selection);
					editBuilder.replace(selection,  kebabize(token));
				});
			}
			else {
				//? no selection
				let text = doc.getText().replace(/(?<=<[\/]*)([A-Z][a-zA-Z]+)/gm, s => kebabize(s))
				text = text.replace(/(?<==)\{([^}]+)\}/gm, (s, name) => `"${name}"`)
    			editBuilder.replace(new vscode.Range(doc.lineAt(0).range.start, doc.lineAt(doc.lineCount - 1).range.end), 
				text// "Hello world!"
				);

			}
		});
	});
	context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() {}
