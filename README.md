# Lotto 6/45 Card

![HAKC][hakc-shield]
![HACS][hacs-shield]
![Version v1.2][version-shield]

Home Assistant lovelace 커스텀 UI 입니다.<br>
아래의 lotto645 커스텀 컴포넌트 센서를 이용합니다.
<br><br>
## Installation
### Manual
- HA 설치 경로 아래 www 폴더에 파일을 넣어줍니다.<br>
   `<config directory>/www/lotto645-card.js`

### HACS
- HACS > SETTINGS 메뉴 선택
- ADD CUSTOM REPOSITORY에 "<https://github.com/miumida/lotto645-card>" 입력,
Category에 Plugin 선택 후 저장
- HACS > PLUGINS 메뉴에서 [KR] Lotto 6/45 Card 검색하여 설치
<br><br>
## Usage
### configuration
- lovelace UI 설정 최상단 아래 내용을 추가<br>
```yaml
resources:
  - url: /local/lotto645-card.js?v=0.1
    type: module
```
- card 설정을 추가
```yaml
entity: sensor.lotto645
type: 'custom:lotto645-card'
```

[version-shield]: https://img.shields.io/badge/version-v1.0-orange.svg
[hakc-shield]: https://img.shields.io/badge/HAKC-Enjoy-blue.svg
[hacs-shield]: https://img.shields.io/badge/HACS-Custom-red.svg
