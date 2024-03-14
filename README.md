 讓各專案在網路上對外公開並能統一管理,使用GCP部署

# 架構圖
<div align=center>
  <img  height="500" src="https://github.com/jiunfeng/ProjectB/assets/84163351/0ae6282b-6393-4af6-b277-a0073caa0641"/>

</div>


# 技術相關
- 使用Git submodule整合各專案
- NO-IP獨立域名申請,使用DDNS使GCP VM動態IP綁定Domain name
- Docker
  - Docker compose 一鍵部署<br>
  - Dockerfile 調整dockerhub image內容<br>
  - 內部網路建立<br><br>
- Nginx
  - Proxy_pass反向代理二級目錄讓各專案有獨立url
  - 靜態資源代理
