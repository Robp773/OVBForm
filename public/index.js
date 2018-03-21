'use strict';

$('#medicalReasonInfo').hide();
$('#applicationForm').submit(function(e) {
  e.preventDefault();
  let value = $('.primary').val();
  window.print();
});
$('#medicalTrue').change(function(e) {
  if ($('#medicalTrue').is(':checked')) {
    $('#medicalReasonInfo').show();
  }
});
$('#medicalFalse').change(function(e) {
  $('#medicalReasonInfo').hide();
});