$(function () {
	$('.test').each(function (idx, el) {
		var $test       = $(el),
				reqUrl      = $test.find('.reqUrl').text(),
				reqType     = $test.find('.reqType').text(),
				reqData     = reqType === 'GET' ? undefined :
											$test.find('.reqData').text(),
				$btn        = $test.find('button'),
				$respUrl    = $test.find('.respUrl'),
				$respStatus = $test.find('.respStatus'),
				$respData   = $test.find('.respData');

		$btn.click(function () {
			$respData.text('awaiting result...');
			var xhr;
			$.ajax({
				type: reqType, url: reqUrl, data: reqData,
				xhr: function () {
					return xhr = $.ajaxSettings.xhr();
				}
			}).done(function(respData, respStatus) {
					var respUrl = xhr.responseURL;
					if (respUrl && respUrl !== reqUrl) {
						$respUrl.text(respUrl);
					}
					$respStatus.text(respStatus);
					if (typeof respData === 'object' && window.JSON) {
						respData = JSON.stringify(respData, null, 2);
					}
					$respData.text(respData);
				});
			});
	});

	$('button:first').click();
});
