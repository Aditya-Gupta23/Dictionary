const form=document.querySelector("form");
const result=document.querySelector(".result");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});



const getWordInfo=async(word)=>{
try{
    document.querySelector(".result").style.visibility="visible";

    result.innerHTML="Fetching data...";

    const responce=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}

`);
    const data=await responce.json();
    result.innerHTML=`
        <h2>Word: ${data[0].word}</h2>
        <p><strong>Part of Speech: </strong><i style="color:#808080">${data[0].meanings[0].partOfSpeech===undefined?"Not Found":data[0].meanings[0].partOfSpeech}</i></p>
        <p><strong>Meaning: </strong>${data[0].meanings[0].definitions[0].definition===undefined ? "Not Found":data[0].meanings[0].definitions[0].definition}</p>
        <p><strong>Example: </strong>${data[0].meanings[0].definitions[0].example===undefined?"Not Found":data[0].meanings[0].definitions[0].example}</p>
        <p><strong>Antonyms: </strong></p>
    `;
    if(data[0].meanings[0].antonyms.length===0)
    {
        result.innerHTML+=`<p>Not found</p>`;
    }
    else
    {
        for(let i=0;i<data[0].meanings[0].antonyms.length;i++)
        {
            result.innerHTML+=`<li>${data[0].meanings[0].antonyms[i]}</li>`;
        }
    }
    result.innerHTML+=`<p><strong>Synonyms: </strong></p>`;
    if(data[0].meanings[0].synonyms.length==0){
        result.innerHTML+=`<p>Not found</p>`;
    }
    else{
        for(let i=0;i<data[0].meanings[0].synonyms.length;i++)
        {
            result.innerHTML+=`<li>${data[0].meanings[0].synonyms[i]}</li>`;
        }
    }
    result.innerHTML+=`<br><br>`
    result.innerHTML+=`<a href="${data[0].sourceUrls}" target="_blank">Read More</a>`;
    console.log (data);
}

catch(error){
    result.innerHTML=`<p>Sorry word could not be found<p>`
}
}
