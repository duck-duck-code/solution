## Deploy

0. Login to heroku CLI & heroku container
   heroku login
   heroku container:login

1. Build docker image
   from solution/WebApplication/ run
   docker build -f WebApplication/Dockerfile -t registry.heroku.com/duck-duck-code/web .

2. Push image to heroku
   docker push registry.heroku.com/duck-duck-code/web

3. Release container
   heroku container:release web -a duck-duck-code

4. Loggs are here
   heroku logs -a duck-duck-code --tail


