default:
	go build -ldflags "-s"

pi:
	GOOS=linux GOARM=7 GOARCH=arm go build -ldflags "-s"

run:
	GOOS=darwin go build -ldflags "-s" && ./daemon

deploy:
	scp -P 85 prayer_notifier pi@192.168.178.23:/home/pi/Projects/prayer_notifier/

deploy_papa:
	scp -P 85 baby pi@192.168.1.46:/home/pi/Projects/baby/
