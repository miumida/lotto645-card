# Lotto 6/45 Card
로또 6/45 당첨번호를 알려주는 Home Assistant Sensor 입니다.<br>
당첨번호 `번호1 번호2 번호3 번호4 번호5 번호6 + 보너스` 형태로 보여줍니다.

<br><br>
## Installation
HA 설치 경로 아래 www 폴더에 파일을 넣어줍니다.
<config directory>/www/lotto645-card.js
<br><br>
## Usage
### configuration
lovelace UI 설정 최상단 아래 내용을 추가<br>
```yaml
resources:
  - url: /local/lotto645-card.js?v=0.1
    type: module
```
card 설정을 추가
```yaml
entity: sensor.lotto645
type: 'custom:lotto645-card'
```
