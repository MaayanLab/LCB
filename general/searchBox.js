$.widget("q.customAutocomplete",$.ui.autocomplete,{_renderMenu:function(b,a){var c=this;b.addClass("custom-autocomplete-ul");$.each(a,function(d,e){c._renderItemData(b,e)})}});var SearchView=Backbone.View.extend({initialize:function(){this.$el=$("#searchBox");this.minLength=3;this.url="http://www.maayanlab.net/LINCS/LCBL_searchbox_server/desc_final";var a=this;this.$el.customAutocomplete({source:this.url,minLength:this.minLength,select:function(d,e){d.preventDefault();var c;var b;if(e.item.value=="All"){c=a.allTerm;b=a.currentOptions}else{var f=e.item.id;a.$el.val(e.item.value);locatePerturbation(f)}},open:function(b,c){a.allTerm=a.$el.val()},response:function(b,c){a.currentOptions=_.map(c.content,function(d){return d.label})}})}});var searchView=new SearchView;var tileId;function locatePerturbation(b){clearTileInfo();tileId=JSON.parse("["+b+"]");g_batch=tileId[0];g_batchSelectIdx=tileId[0]<2?tileId[0]:tileId[0]-1;g_cellType=tileId[1];g_category=0;d3.select("#batchSelect").selectAll("option").filter(function(e,c){return c==g_batchSelectIdx}).attr("selected","selected");var a={};_.extend(a,Backbone.Events);a.listenToOnce(messenger,"batchCatched",function(){tiles.each(function(e,c){if(e[2]==tileId[2]&&e[3]==tileId[3]&&e[4]==tileId[4]){showInfo2(c,this)}})});showBatch(g_batchSelectIdx)};