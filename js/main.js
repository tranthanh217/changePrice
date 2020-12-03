var remove = function(index){
	const rows=document.querySelectorAll("div.row-change");
	for (const r of rows){
		if(r.id!=index){
			continue;
		}
		index!=1&&r.remove();
	}
};

var submitlist = function(){
	$('.spinner-border').addClass('loading');
		
	// list json sku and price
	var list=[];
	for (const r of document.querySelectorAll("div.row-change")){
		for(const i of r.querySelectorAll("input")){
			var listItem = {};
			const fields=r.querySelectorAll("input");
			const skuF=fields[0];
			const priceF=fields[1];

			listItem.sku = skuF.value;
			listItem.price = priceF.value;
		}
		list.push(listItem);
	}
	var listJsonStr= JSON.stringify(list);

	// save form
	if (typeof(Storage) !== "undefined") {
		var d = new Date();
		var n = d.getTime();
		var fieldSave = document.querySelector(".formSave");
		fieldSave.value !== '' ? localStorage.setItem(fieldSave.value, listJsonStr) :  localStorage.setItem(d , listJsonStr);
	}
	setTimeout(function() {
		$('.spinner-border').removeClass('loading');
	}, 1000);
};

var loadFormTempale = function(index){
	const listKeySave = Object.entries(localStorage);
	const getKey = listKeySave[index];
	const data = localStorage.getItem(getKey[0]);
	const obj = JSON.parse(data);
	$('.st-hover').remove();
	obj.map(function(key, index){
		$('.input-form').append(`
			<div id="${index + 1}" class="row row-change position-relative st-hover ">
			<div class="col-6">
			<input type="text" name="sku" class="form-control sku" value="${obj[index].sku}" placeholder="input sku ..">
			</div>
			<div class="col-6">
			<input type="text" name="price" class="form-control price" value="${obj[index].price}" placeholder="input price ..">
			</div>
			<div class="icon-action remove remove-action"  onclick="remove(${index + 1})"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
			</div>
			`);
	})
	closePopup();
};
var clearLocal = function(){
	localStorage.clear();
	closePopup();
}
var closePopup = function(){
	$('#listSave').modal('hide');
};

(function($) {

	"use strict";
	var index = 1;

	$('.addRow-btn').on('click', function(){
		index ++;
		$('.st-hover:last-child').after(`
			<div id="${index}" class="row row-change position-relative st-hover ">
			<div class="col-6">
			<input type="text" name="sku" class="form-control sku" placeholder="input sku ..">
			</div>
			<div class="col-6">
			<input type="text" name="price" class="form-control price" placeholder="input price ..">
			</div>
			<div class="icon-action remove remove-action"  onclick="remove(${index})"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
			</div>
			`);
	});

	$('.submit-host').on('click',function(){
		$('.spinner-border').addClass('loading');
		setTimeout(function() {
			$('.spinner-border').removeClass('loading');
			$('#addStoreModal').modal('hide')
		}, 1000);
	});

	$('.loadSave').on('click',function(){
		$('#keys .listIteam').remove();
		const listKeySave = Object.entries(localStorage);
		if (listKeySave!='') {
			var index = 0;
			for (const f of listKeySave) {
				$('#keys').append(`<div class="listIteam" onclick="loadFormTempale(${index})">${f[0]}</div>`);
				index ++;
			}
		}else{
			$('#keys').append(`<div class="listIteam">Nothing</div>`);
		}
	});

	
})(jQuery);