var _gaq = _gaq || [];
$(document).ready(function() {
	Configuration.Init();
	Calendar.Init();
	$('.js--tabs').tabs();
	if(Configuration.projecten.length === 0 && Configuration.articles.length === 0){
		$('.js--tabs').tabs({ selected: 1 });
	}
	  _gaq.push(['_setAccount', 'UA-24278616-2']);
	  _gaq.push(['_setDomainName', 'none']);

	  _gaq.push(['_trackPageview']);

	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = '/js/analytics.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
});