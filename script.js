require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
    ], function(
        Map,MapView, FeatureLayer
    ) {
      
      var template = { // autocasts as new PopupTemplate()
        title: "What Happened?",
        content: [{
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [{
            fieldName: "CollisnTyp",
            label: "Collision Type",
            visible: true
          }]
        }]
      };

      /************************************************************
       * Creates a new WebMap instance. A WebMap must reference
       * a PortalItem ID that represents a WebMap saved to
       * arcgis.com or an on-premise portal.
       *
       * To load a WebMap from an on-premise portal, set the portal
       * url with esriConfig.portalUrl.
       ************************************************************/
	  const fl = new FeatureLayer({
		url:"https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Traffic_Collisions/FeatureServer",
                outFields: ["*"],
                popupTemplate: template
	  });

      /************************************************************
       * Set the WebMap instance to the map property in a MapView.
       ************************************************************/
      var map = new Map({
          basemap: "streets"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
		  extent: { // autocasts as new Extent()
			xmin: -118.264858634618,
			ymin: 33.5444932701483,
			xmax: -117.299011374275,
			ymax: 35.0054716855699,
            spatialReference: 4326
          }
          
        });
      
	    map.add(fl);
      
        var symbol = {
            type: "simple-marker", 
            color:"red"
        };
        var renderer = {
            type: "simple",  // autocasts as new SimpleRenderer()
            symbol: symbol
        };

        fl.renderer = renderer
	  
    });
