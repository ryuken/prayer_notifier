default:
	GOOS=darwin go build -ldflags "-s"

pi:
	go build -ldflags "-s" prayer_notifier.go time.go download.go parse_today.go check.go

run:
	GOOS=darwin go build -ldflags "-s" prayer_notifier.go time.go download.go parse_today.go && ./prayer_notifier

deploy:
	scp -P 85 prayer_notifier pi@192.168.178.23:/home/pi/Projects/prayer_notifier/

deploy_papa:
	scp -P 85 baby pi@192.168.1.46:/home/pi/Projects/baby/
