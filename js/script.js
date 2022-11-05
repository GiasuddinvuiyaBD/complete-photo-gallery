'use strict';

(() => 
{
	// selector start here
	const submitBtnElm = document.querySelector('#submitBtn');
	const searchPhotoElm = document.querySelector('input[type="text"]');
	const nextBtnElm = document.querySelector('#nextBtn');
	const nextBtnDesingElm = document.querySelector('#footerBtn a');
	const photoDesingElm = document.querySelector('.blog img');
	const photosElm = document.querySelector('.image-gallary'); // 
	const test = document.querySelector('.w-25');


	// default initial function start here
	const api_key = '563492ad6f917000010000016a8107612d7b434a81024ab8b4378334';
	let pagenr = true;
	let search = false;
	let query = "";



	// sending request to api 
	async function curatedPhotos(pagenr)
	{
		const data = await fetch(`https://api.pexels.com/v1/curated?per_page=16&page=${pagenr}`,
		{
			method : "Get", 
			headers : 
			{
				Accept : "application/json",
				Authorization : api_key
			}
		});
		const result = await data.json();
		// show photo to ui 
		showPhotoToUI(result);
	}
	// calling creatPhotos function
	curatedPhotos(pagenr)

	// searching function start here 
	async function searchPhotos(query,pagenr)
	{
		const data = await fetch(`https://api.pexels.com/v1/search?query=${searchPhotoElm.value}&per_page=16&page=${pagenr}`,
		{
			method : "Get", 
			headers : 
			{
				Accept : "application/json",
				Authorization : api_key
			}
		});
		const result = await data.json();
		// show item to ui 
		showPhotoToUI(result)
	}

	// submit button start here
	submitBtnElm.addEventListener('click',(evt) => 
	{
		evt.preventDefault();
		
		if(searchPhotoElm.value === "") return;
		clear();
		search = true;
		searchPhotos(query,pagenr);


	})

	// next button start here 

	nextBtnElm.addEventListener('click',(evt) => 
	{
		evt.preventDefault()
		nextBtnDesingElm.textContent = 'Loading'
		setTimeout(() => 
		{
			if(!search)
			{
				pagenr++;
				curatedPhotos(pagenr)
			}else 
			{
				if(query.value === '') return;
				pagenr++
				// search photos function 
				searchPhotos(query,pagenr)
			}
			// button desing start here
			nextBtnDesingElm.textContent = 'Loading...'
		},2000);
		setTimeout(() => 
		{
			nextBtnDesingElm.textContent = 'Loading'
		},3000)
		
	});

	// showin item to ui 
	function showPhotoToUI(result)
	{
		result.photos.forEach((photos) => 
		{
			const pic = document.createElement("div");
			pic.setAttribute('class','parent-image');
			// console.log(pic)
			pic.innerHTML = `
								<span class="blog">
									<img class="imgage" src="${photos.src.medium}" >
									<p>Photographer :${photos.photographer}</p>
									<a href="${photos.src.large}" class="downloadBtn">Show Image</a>
									<i class="fa-regular fa-x"></i>
								</span>
							`;
			// document.querySelector('.w-25').appendChild(pic)
			photosElm.appendChild(pic);
		});
	}

// <img class="imgage" src="${photos.src.medium}">
// 	<p>Photographer :${photos.photographer}</p>
// <a href="${photos.src.large}" class="downloadBtn">Show Image</a>




	// clear function start here
	function clear()
	{
		searchPhotoElm.value === "";
		photosElm.innerHTML = '';
		pagenr = true;
	}
})()







