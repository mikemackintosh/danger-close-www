build:
	docker build -t dangerclose-www .

dev:
	docker build -t dangerclose-dev-www env/dev
	docker run -it -p 7841:7841 -v $(PWD):/app dangerclose-dev-www

deploy:
	docker build -t dangerclose-www -c env/prod/Dockerfile .