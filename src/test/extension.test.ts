import * as vs from "vscode";
import * as path from "path";

export const ext = vs.extensions.getExtension("DanTup.test-issue-repro");
if (!ext) {
    throw new Error("couldn't find ext");
}
export const file1 = vs.Uri.file(path.join(ext.extensionPath, "src/test/test_files/one.txt"));
export const file2 = vs.Uri.file(path.join(ext.extensionPath, "src/test/test_files/two.txt"));


suite("Extension Tests", function () {

    for (let i = 0; i < 100; i++) {
        test(`Attempt ${i}`, async function () {
            while (vs.window.activeTextEditor) {
                await vs.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
                await new Promise((resolve) => setTimeout(resolve, 5));
            }

            const doc = await vs.workspace.openTextDocument(i % 2 === 0 ? file1 : file2);
            await vs.window.showTextDocument(doc);

        });
    }
});
