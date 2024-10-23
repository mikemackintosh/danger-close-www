build:
	docker build -t dangerclose-www .

dev:
	yarn dev

deploy:
	docker buildx build --platform=linux/amd64 -t ghcr.io/mikemackintosh/dangerclose-www:latest  .  
	docker push ghcr.io/mikemackintosh/dangerclose-www:latest