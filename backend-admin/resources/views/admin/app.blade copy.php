<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>後臺管理系統</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/css/fontawesome/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="/css/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="/css/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="/css/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="/css/summernote-bs4.min.css">
  <script src="/js/admin/sweetalert2.all.min.js"></script>
  <link href="/css/admin/sweetalert2.min.css">
  <!-- 上方為sweet2的前置 -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
</head>

<body>
  <!-- Content Wrapper. Contains page content -->
  <div class="mx-2">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">@yield("title")</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="manager">Home</a></li>
            <li class="breadcrumb-item active">@yield("title")</li>
          </ol>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->
  
    @yield("content")
  </div>
  <!-- jQuery -->
  <script src="/js/jquery/jquery.min.js"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
  <script>
    $.widget.bridge('uibutton', $.ui.button)
  </script>
  <!-- Bootstrap 4 -->
  <script src="/js/bootstrap.bundle.min.js"></script>
  <!-- ChartJS -->
  <script src="/js/Chart.min.js"></script>
  <!-- Sparkline -->
  <script src="/js/sparkline.js"></script>
  <!-- JQVMap -->
  <script src="/js/jquery.vmap.min.js"></script>
  <script src="/js/jquery.vmap.usa.js"></script>
  <!-- jQuery Knob Chart -->
  <script src="/js/jquery.knob.min.js"></script>
  <!-- daterangepicker -->
  <script src="/js/moment.min.js"></script>
  <script src="/js/daterangepicker.js"></script>
  <!-- Tempusdominus Bootstrap 4 -->
  <script src="/js/tempusdominus-bootstrap-4.min.js"></script>
  <!-- Summernote -->
  <script src="/js/summernote-bs4.min.js"></script>
  <!-- overlayScrollbars -->
  <script src="/js/jquery.overlayScrollbars.min.js"></script>
  <!-- AdminLTE App -->
  <script src="/js/adminlte.min.js"></script>
  <!-- AdminLTE for demo purposes -->
  <script src="/js/demo.js"></script>
  <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
  <script src="/js/dashboard.js"></script>

  <script src="js/jquery-3.7.1.min.js"></script>

  <script>
    // 下方為警告視窗，裡面文字使用session寫出
    @if(Session::has('message'))
    Swal.fire("{{Session::get("message")}}");
    @endif

    // 此為checkbox全選功能的程式碼
    // document.ready : 當網頁載入時
    $(document).ready(function() {
      // $("#all") : $為jquery語法，【#】用於id; 【.】點，用於class
      // 當all這個id被點選時
      $("#all").click(function() {
        // 如果id為all，且是已選取的情況
        if ($(this).is(":checked")) {
          // .chk : class為chk
          // 將class為chk的屬性(attr)，設為選取
          $(".chk").attr("checked", true);
        } else {
          // 如果id為all，且不是選取情況
          // 將class為chk的屬性(attr)，設為非選取
          $(".chk").attr("checked", false);
        }
      });
    });

    // 刪除checkbox選取起來的函數
    function deleteAll() {
      Swal.fire({
        title: "確定刪除?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "確定",
        denyButtonText: "不要刪除"
      }).then((result) => {
        if (result.isConfirmed) {
          // document.list : 獲取所有name叫list的表單的所有資料
          // .submit() : 按下submit類型的按鈕(sweet2的確定按鈕就是submit)，會跳轉並把資料傳送到跳轉的網頁，跳轉網頁為當前【/】後的文字改為delete的網頁，範例:當http://127.0.0.1:8000/manager執行【document.list.submit();】之後會跳轉到http://127.0.0.1:8000/delete的網頁
          document.list.submit();
        }
      });
    }
  </script>
</body>

</html>