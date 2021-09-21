run-pg:
	docker run --name typoteka-pg -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=typoteka -d postgres:latest
