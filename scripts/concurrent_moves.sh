read  discard wsId item0Id item1Id <<< $(SCENARIO=createRootlinkWithTwoChildren yarn start | grep OUTPUT)
echo "Workspace: $wsId"
echo "First item: $item0Id"
echo "Second item: $item1Id"


WORKSPACE_ID=$wsId SCENARIO=moveChild CHILD_TO_MOVE=$item0Id yarn start &
WORKSPACE_ID=$wsId SCENARIO=moveChild CHILD_TO_MOVE=$item1Id yarn start &

wait

echo "The calls move different items to the same position. One of them should fail, but both succeed."
echo "If one fails, insert a wait in the server just before committing the transaction and try again."
