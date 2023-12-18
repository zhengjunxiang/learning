// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from 'child_process';
import * as os from 'os';
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "i18n-helper" is now active!11');

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

  let chineseTreeViewProvider = new ChineseTreeViewProvider();
  vscode.window.registerTreeDataProvider('chineseSearch', chineseTreeViewProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand('chineseSearch.search', () => {
      chineseTreeViewProvider = new ChineseTreeViewProvider();
      vscode.window.registerTreeDataProvider('chineseSearch', chineseTreeViewProvider);
      vscode.commands.executeCommand('workbench.view.explorer');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('chineseSearch.openFile', (filePath: string) => {
      vscode.workspace.openTextDocument(filePath).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    })
  );
}

class ChineseTreeViewProvider implements vscode.TreeDataProvider<ChineseEntry> {
  private _onDidChangeTreeData: vscode.EventEmitter<ChineseEntry | undefined> = new vscode.EventEmitter<ChineseEntry | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ChineseEntry | undefined> = this._onDidChangeTreeData.event;

  private chineseEntries: ChineseEntry[] = [];

  constructor() {
    this.searchChineseInFiles();

    // 监听文件内容变化
    vscode.workspace.onDidChangeTextDocument(event => {
      const filePath = event.document.uri.fsPath;
      if (this.isSupportedFile(filePath)) {
        this.searchChineseInFile(filePath);
      }
    });
  }

  private async searchChineseInFile(filePath: string) {
    const content = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
    const text = Buffer.from(content).toString('utf-8');
    if (this.containsChinese(text)) {
      const chineseTexts = this.extractChinese(text);
      const existingEntryIndex = this.chineseEntries.findIndex(entry => entry.filePath === filePath);
      if (existingEntryIndex !== -1) {
        const updatedEntry = new ChineseEntry(filePath, chineseTexts);
        this.chineseEntries[existingEntryIndex] = updatedEntry;
      } else {
        this.chineseEntries.push(new ChineseEntry(filePath, chineseTexts));
      }
      this._onDidChangeTreeData.fire(undefined);
    }
  }

  private isSupportedFile(filePath: string): boolean {
    return /\.(js|ts|jsx|tsx|html|css)$/.test(filePath);
  }

  private async searchChineseInFiles() {
    const fileUris = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx,html,css}', '**/node_modules/**', 10000);
    const results: { filePath: string, chineseTexts: string[] }[] = [];

    for (const uri of fileUris) {
      const content = await vscode.workspace.fs.readFile(uri);
      const text = Buffer.from(content).toString('utf-8');
      if (this.containsChinese(text)) {
        const chineseTexts = this.extractChinese(text);
        results.push({ filePath: uri.fsPath, chineseTexts });
      }
    }

    this.chineseEntries = results.map(result => new ChineseEntry(result.filePath, result.chineseTexts));
    this._onDidChangeTreeData.fire(undefined);
  }

  private containsChinese(text: string): boolean {
    return /[\u4E00-\u9FFF]/.test(text);
  }

  private extractChinese(text: string): string[] {
    return text.match(/[\u4E00-\u9FFF]+/g) || [];
  }

  getTreeItem(element: ChineseEntry): vscode.TreeItem {
    return {
      label: element.filePath,
      collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
      command: {
        command: 'chineseSearch.openFile',
        title: 'Open File',
        arguments: [element.filePath]
      },
      iconPath: {
        light: vscode.Uri.file(this.getIconPath('media/i18n.svg')),
        dark: vscode.Uri.file(this.getIconPath('media/i18n.svg'))
      }
    };
  }

  getChildren(element?: ChineseEntry): Thenable<ChineseEntry[]> {
    if (element) {
      return Promise.resolve(element.children);
    }
    return Promise.resolve(this.chineseEntries);
  }

  private getIconPath(iconName: string): string {
    return path.join(__filename, '..', iconName);
  }
}

class ChineseEntry {
  constructor(
    public readonly filePath: string,
    public readonly chineseTexts: string[]
  ) {}

  get children(): ChineseEntry[] {
    return this.chineseTexts.map(text => new ChineseEntry(text, []));
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
