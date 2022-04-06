default:
	go build -ldflags "-s"

pi:
	GOOS=linux GOARM=7 GOARCH=arm go build -ldflags "-s"

run:
	GOOS=darwin go build -ldflags "-s" && ./daemon

deploy:
	scp daemon root@192.168.1.7:/root/prayer_notifier/

deploy_live:
	scp daemon root@muslimsconnected.nl:/var/www/html/prayer_notifier/
