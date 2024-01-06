import * as vscode from 'vscode';
import { ChineseProvider } from './chineseProvider';

export function activate(context: vscode.ExtensionContext) {
    const chineseProvider = new ChineseProvider();
    vscode.window.registerTreeDataProvider('chineseTreeView', chineseProvider);

    let disposable = vscode.commands.registerCommand('extension.searchChinese', () => {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('未找到工作区');
            return;
        }

        chineseProvider.searchChinese(rootPath);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
