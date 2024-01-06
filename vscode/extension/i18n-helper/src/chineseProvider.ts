import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class ChineseItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly matches: string[]
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.matches.length} 个中文匹配`;
        this.description = this.matches.join(', ');
    }
}

export class ChineseProvider implements vscode.TreeDataProvider<ChineseItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ChineseItem | undefined | void> = new vscode.EventEmitter<ChineseItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<ChineseItem | undefined | void> = this._onDidChangeTreeData.event;

    private filesWithChinese: { [key: string]: string[] } = {};

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    async searchChinese(rootPath: string) {
        this.filesWithChinese = {};
        await this.searchInDirectory(rootPath);

        this.refresh();
    }

    private async searchInDirectory(directory: string) {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                await this.searchInDirectory(filePath);
            } else if (path.extname(file) === '.txt' || path.extname(file) === '.js') {
                const content = fs.readFileSync(filePath, 'utf-8');
                const chineseMatches = content.match(/[\u4e00-\u9fa5]+/g);

                if (chineseMatches && chineseMatches.length > 0) {
                    this.filesWithChinese[filePath] = chineseMatches;
                }
            }
        }
    }

    getTreeItem(element: ChineseItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ChineseItem): Thenable<ChineseItem[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            const items: ChineseItem[] = [];
            for (const filePath in this.filesWithChinese) {
                const matches = this.filesWithChinese[filePath];
                const label = path.basename(filePath);
                const collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                const item = new ChineseItem(label, collapsibleState, matches);
                items.push(item);
            }
            return Promise.resolve(items);
        }
    }
}
