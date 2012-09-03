define([ "dojo/query",
  "dijit/layout/BorderContainer", 
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
  "./views/TrafficView",
  "./traffic",
  "./views/DetailView",
  "dojo/domReady!"], function(query, BorderContainer, TabContainer, ContentPane,TrafficView,traffic,DetailView) {
	var appLayout = new BorderContainer({
		design : "headline",
		liveSplitters: false,
		gutters: false
	}, "appLayout");
	
	appLayout.addChild(
		    new ContentPane({
		        region: "top",
		    },"header")
		)
	appLayout.addChild(
		    new ContentPane({
		        region: "center",
		        splitter: true
		    },"main")
		);
	
	var detail = new ContentPane({
        region: "bottom",
        splitter: true,
        layoutPriority:2
    },"detail");
	//appLayout.addChild(detail);
	
	
	appLayout.addChild(
		    new ContentPane({
		        region: "right",
		        splitter: true,
		        layoutPriority:1
		    },"rightCol")
		);
	
	appLayout.startup();
	
	var trafficView = new TrafficView({collection: traffic, el: $("#trafficTable .data tbody")[0]});		
	
	var detailView = new DetailView({el: $("#detail")});
	
	trafficView.$el.on("click","tr",function(e){
		var $this = $(this);
		var model = traffic.get($this.data("flow-id"));
		detailView.setModel(model);
		MainLayout.openDetail();
		$this.addClass("selected");
		if(MainLayout.currentSelection){
			MainLayout.currentSelection.removeClass("selected");
		}
		MainLayout.currentSelection = $this;
	});
	
	var isDetailAdded = false;
	var MainLayout = {
			currentSelection: undefined,
			trafficView : trafficView,
			detailView: detailView,
			appLayout: appLayout,
			openDetail: function(){
				if(isDetailAdded)
					return;
				appLayout.addChild(detail);
				isDetailAdded = true;
			},
			closeDetail: function(){
				if(!isDetailAdded)
					return;
				appLayout.removeChild(detail);
				isDetailAdded = false;
			}
	}
	return MainLayout;
});