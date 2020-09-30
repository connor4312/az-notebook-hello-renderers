// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TestProvider } from './testProvider';

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.notebook.registerNotebookContentProvider('test-notebook-renderer', new TestProvider()),

    vscode.notebook.registerNotebookKernelProvider(
      { filenamePattern: '*.sample-notebook' },
      {
        provideKernels() {
          return [
            {
              label: 'Test notebook kernel',
              preloads: [vscode.Uri.parse(invalid)],
              cancelCellExecution() {},
              cancelAllCellsExecution() {},
              async executeAllCells(doc) {
                await Promise.all(doc.cells.map((cell) => this.executeCell(doc, cell)));
              },
              async executeCell(_doc, cell) {
                if (cell?.language !== 'json') 
                  return;
                }

                try {
                  cell.outputs = [
                    {
                      outputKind: vscode.CellOutputKind.Rich,
                      data: { 'application/custom+image': JSON.parse(cell.document.getText()) },
                    },
                  ];
                } catch (e) {
                  cell.outputs = [
                    {
                      outputKind: vscode.CellOutputKind.Error,
                      ename: e.constructor.name,
                      evalue: e.message,
                      traceback: e.stack,
                    },
                  ];
                }
              },
            },
          ];
        },
      },
    ),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
