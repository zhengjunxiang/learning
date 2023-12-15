// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as vscode from 'vscode';
import * as path from 'path';
import { TextDocument, EventEmitter } from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "i18n-helper" is now active!');

	// 提示弹窗
	const key = 'i18n-helper.showTip';
  const showTip = vscode.workspace.getConfiguration().get(key)
  if (showTip !== false) {
    const result = await vscode.window.showInformationMessage(
      '是否要打开愧怍的小站？',
      'yes',
      'no',
      'never',
    )
    if (result === 'yes') {
      const commandLine =
        os.platform() === 'win32'
          ? `start https://kuizuo.cn`
          : `open https://kuizuo.cn`
      exec(commandLine)
    } else if (result === 'never') {
      //最后一个参数，为true时表示写入全局配置，为false或不传时则只写入工作区配置
      await vscode.workspace.getConfiguration().update(key, false, true)
    }
  }

	// 安装后就会执行
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('i18n-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from i18n-helper!');
	});

	context.subscriptions.push(disposable1);

  let disposable = vscode.commands.registerCommand('i18n-helper.searchChinese', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }

        const projectRootPath = vscode.workspace.rootPath;
        if (!projectRootPath) {
            vscode.window.showInformationMessage('No project is open');
            return;
        }

        vscode.workspace.findFiles('**/*', '').then((files) => {
            const chineseRegex = /[\u4e00-\u9fa5]+/g;
            let chineseTexts: { [key: string]: string[] } = {};

            files.forEach(file => {
                const filePath = file.fsPath;
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const matches = fileContent.match(chineseRegex);
                if (matches) {
                    chineseTexts[filePath] = matches;
                }
            });

            // Call function to update the sidebar view
            updateSidebar(chineseTexts);
        });
    });

    context.subscriptions.push(disposable);

}

class ChineseTextProvider implements vscode.TreeDataProvider<ChineseTextItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ChineseTextItem | undefined> = new vscode.EventEmitter<ChineseTextItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ChineseTextItem | undefined> = this._onDidChangeTreeData.event;
    protected currentFile: string | undefined;
    private changeEvent = new EventEmitter<void>();

    constructor(private chineseTexts: { [key: string]: string[] }) {
      console.log('constructor-chineseTexts', chineseTexts)
    }

    public refresh(document?: TextDocument | undefined): void {
      if (document && document.languageId === "antlr" && document.uri.scheme === "file") {
          this.currentFile = document.fileName;
      } else {
          this.currentFile = undefined;
      }
      this.changeEvent.fire();
  }

    getTreeItem(element: ChineseTextItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ChineseTextItem): Thenable<ChineseTextItem[]> {
        if (element) {
            console.log('getChildren-element', element)
            console.log('getChildren-this.chineseTexts', this.chineseTexts)
            // Return the Chinese text items for the given file
            const fileChineseTexts = this.chineseTexts[`${element.label}`];
            return Promise.resolve(fileChineseTexts.map(text => new ChineseTextItem(text)));
        } else {
            // Return the file items
            const fileItems = Object.keys(this.chineseTexts).map(key => new ChineseTextItem(path.basename(key), vscode.TreeItemCollapsibleState.Collapsed));
            return Promise.resolve(fileItems);
        }
    }
}

class ChineseTextItem extends vscode.TreeItem {
    constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}`;
        this.description = `${this.label}`;
    }
}


function updateSidebar(chineseTexts: { [key: string]: string[] }) {
  console.log('updateSidebar-chineseTexts', chineseTexts)
    // Implement the logic to update the sidebar with the found Chinese texts
    // This part of the code depends on how you want to display the data in the sidebar
    const chineseTextProvider = new ChineseTextProvider(chineseTexts);
    vscode.window.registerTreeDataProvider('i18n', chineseTextProvider);
    // chineseTextProvider.refresh();
}

// This method is called when your extension is deactivated
export function deactivate() {}
