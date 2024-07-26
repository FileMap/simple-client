import assert from 'assert';
import uuid from "uuid-random";
import { encodeCommitChanges, sdk } from "../sdk";

export const createWorkspaceForTests = async () => {

    const { createWorkspace: workspace } = await sdk.createWorkspace({
        payload: { name: 'sync engine test' },
    });

    const workspaceId = workspace.id;
    const rootlinkId = uuid();

    await sdk.createWorkspaceCommit({
        workspaceId,
        payload: {
            commitId: uuid(),
            workspaceId,
            changes: encodeCommitChanges([
                {
                    changeId: uuid(),
                    type: 'create',
                    payload: {
                        id: rootlinkId,
                        name: 'test',
                        position: { x: 0, y: 0 },
                        size: { width: 32, height: 16 },
                        gridSize: { width: 32, height: 16 },
                        type: 'panel',
                    },
                },
            ]),
        },
    });
    return { rootlinkId, workspaceId };
};

async function main() {
    const {rootlinkId, workspaceId} = await createWorkspaceForTests();
    const item = await sdk.fetchWorkspaceItem({
        workspaceId,
        itemId: rootlinkId
    });
    assert(item.workspaceItem.name === "test1");
}

export default main;
