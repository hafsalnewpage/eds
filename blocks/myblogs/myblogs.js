async function createTableHeader(table){
    let tr=document.createElement("tr");
    let sno=document.createElement("th");sno.appendChild(document.createTextNode("S.No"));
    let title=document.createElement("th");
    title.appendChild(document.createTextNode("Title"));
    let author=document.createElement("th");
    author.appendChild(document.createTextNode("Author"));
    let pdate=document.createElement("th");
    pdate.appendChild(document.createTextNode("Published Date"));
    let actionH=document.createElement("th");
    actionH.appendChild(document.createTextNode("Action"));
    tr.append(sno);tr.append(title);tr.append(author);tr.append(pdate);tr.append(actionH);
    table.append(tr);
}
async function createTableRow(table,row,i){
    let tr=document.createElement("tr");
    let sno=document.createElement("td");
    sno.appendChild(document.createTextNode(i));
    let title=document.createElement("td");
    title.appendChild(document.createTextNode(row.Title));
    let author=document.createElement("td");
    author.appendChild(document.createTextNode(row.Author));
    let pdate=document.createElement("td");
    pdate.appendChild(document.createTextNode(row.PublishedDate));
    let action=document.createElement("td");action.appendChild(document.createTextNode(row.url));
    tr.append(sno);tr.append(title);tr.append(author);tr.append(pdate);tr.append(action);
    table.append(tr);
}

async function createSelectMap(jsonURL){
    const optionsMap=new Map();
    const { pathname } = new URL(jsonURL);

    const resp = await fetch(pathname);
    optionsMap.set("all","All Countries");optionsMap.set("asia","Asia");optionsMap.set("europe","Europe");optionsMap.set("africa","Africa");optionsMap.set("america","America");optionsMap.set("australia","Australia");
    const select=document.createElement('select');
    select.id = "region";
    select.name="region";
    optionsMap.forEach((val,key) => {
        const option = document.createElement('option');
        option.textContent = val;
        option.value = key;
        select.append(option);
      });
     
     const div=document.createElement('div'); 
     div.classList.add("region-select");
     div.append(select);
    return div;
}
async function createTable(jsonURL,val) {

    let  pathname = null;
    if(val){
        pathname=jsonURL;
    }else{
        pathname= new URL(jsonURL);
    }
    
    const resp = await fetch(pathname);
    const json = await resp.json();
    
    const table = document.createElement('table');
    createTableHeader(table);
    json.data.forEach((row,i) => {

        createTableRow(table,row,(i+1));

      
    });
    
    return table;
}    

//export default function decorate(block) {

//}

export default async function decorate(block) {
    const blogs = block.querySelector('a[href$=".json"]');
    const parientDiv=document.createElement('div');
    parientDiv.classList.add('contries-block');

    if (blogs) {
        //parientDiv.append(await createSelectMap(blogs.href));
        parientDiv.append(await createTable(blogs.href,null));
        blogs.replaceWith(parientDiv);
        
        let tables = block.querySelector('table');
        [...tables.children].forEach((row, i) => {
            [...row.children].forEach((column, c) => {
                if (i> 0 && c===4) {
                     console.log(c)
                    const url = column.textContent;
                    const anchor = document.createElement('a');
                    anchor.setAttribute('href', url);
                    const button = document.createElement('button');
                    const text = document.createTextNode('View');
                    anchor.append(button);
                    button.append(text);
                    column.replaceWith(anchor);
                }
            });
        });
        
    }
//    const dropdown=document.getElementById('region');
//      dropdown.addEventListener('change', () => {
//        let url=countries.href;
//        if(dropdown.value!='all'){
//            url=countries.href+"?sheet="+dropdown.value;
//        }
//        const tableE=parientDiv.querySelector(":scope > table");
//        let promise = Promise.resolve(createTable(url,dropdown.value));
//        promise.then(function (val) {
//            tableE.replaceWith(val);
//        });
//      });
  }