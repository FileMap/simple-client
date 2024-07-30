import assert from 'assert';
import uuid from "uuid-random";
import { encodeCommitChanges, sdk } from "../sdk";

async function move(workspaceId: string, itemtoMove: string) {
    await sdk.createWorkspaceCommit({
        workspaceId,
        payload: {
            commitId: uuid(),
            workspaceId,
            changes: encodeCommitChanges([{
                changeId: uuid(),
                type: 'layout',
                payload: {
                    id : itemtoMove,
                    position: {x: 0, y:16},
                    size: { width: 32, height: 16 },
                    type: 'panel'
                }
            }
        ])
        }
    })
}

async function main() {
    const workspaceId = process.env["WORKSPACE_ID"];
    const childToMove = process.env["CHILD_TO_MOVE"];
    assert(workspaceId && childToMove);
    await move(workspaceId, childToMove);
    console.log("Success");
}

export default main;
