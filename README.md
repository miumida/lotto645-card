# Lotto 6/45 Card
홈어시스턴트 lovelace 커스텀 UI 입니다.<br>
아래의 lotto645 커스텀 컴포넌트 센서를 이용합니다.
<br><br>
## Installation
HA 설치 경로 아래 www 폴더에 파일을 넣어줍니다.
  `<config directory>/www/lotto645-card.js`
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
