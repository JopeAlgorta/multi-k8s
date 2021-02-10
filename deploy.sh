docker build -t jopealgorta/multi-client:latest -t jopealgorta/multi-client:$SHA -f ./client/Dockerfile ./client

docker build -t jopealgorta/multi-server:latest -t jopealgorta/multi-server:$SHA -f ./server/Dockerfile ./server

docker build -t jopealgorta/multi-worker:latest -t jopealgorta/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push jopealgorta/multi-client:latest
docker push jopealgorta/multi-server:latest
docker push jopealgorta/multi-worker:latest

docker push jopealgorta/multi-client:$SHA
docker push jopealgorta/multi-server:$SHA
docker push jopealgorta/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=jopealgorta/multi-client:$SHA
kubectl set image deployments/server-deployment server=jopealgorta/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=jopealgorta/multi-worker:$SHA
