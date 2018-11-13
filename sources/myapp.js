import "./styles/app.css";
import {JetApp, HashRouter } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		let theme = "";
		try {
			theme = webix.storage.session.get("doctor_demo_theme");
		}
		catch(err){
			webix.message("You blocked cookies. Theme won't be restored after page reload.","debug");
		}
		const defaults = {
			id			: APPNAME,
			version 	: VERSION,
			router 		: HashRouter,
			debug 		: !PRODUCTION,
			start 		: "/top/dashboard",
			theme		: theme || ""
		};

		super({ ...defaults, ...config });

		this.attachEvent("app:error:resolve", function(err, url) {
			webix.delay(() => this.show("/top/dashboard"));
		});
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
			webix.CustomScroll.init();
		new MyApp().render();
	});
}
