import uuid from "uuid-random";
import { encodeCommitChanges, sdk } from "../sdk";

export const createWorkspaceForTests = async () => {

    const { createWorkspace: workspace } = await sdk.createWorkspace({
        payload: { name: 'test' },
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
                        gridSize: { width: 32, height: 1 },
                        type: 'panel',
                    },
                },
            ]),
        },
    });
    return { rootlinkId, workspaceId };
};

async function createChildren(workspaceId: string, rootlinkId: string) {
    const childId = uuid();
    const child1Id = uuid();
    await sdk.createWorkspaceCommit({
        workspaceId,
        payload: {
            commitId: uuid(),
            workspaceId,
            changes: encodeCommitChanges([{
                changeId: uuid(),
                type: 'create',
                payload: {
                    id : childId,
                    name : "child",
                    position: {x: 0, y:0},
                    size: { width: 32, height: 16 },
                    type: 'panel',
                    parent: rootlinkId
                }
            },
            {
                changeId: uuid(),
                type: 'create',
                payload: {
                    id : child1Id,
                    name : "child1",
                    position: {x: 32, y:0},
                    size: { width: 32, height: 16 },
                    type: 'panel',
                    parent: rootlinkId
                }
            }
        ])
        }
    })
    return [childId, child1Id];
}

async function main() {
    const {rootlinkId, workspaceId} = await createWorkspaceForTests();
    const [childId, child1Id] = await createChildren(workspaceId, rootlinkId);
    console.log(`OUTPUT: ${workspaceId} ${childId} ${child1Id}`)
}

export default main;
