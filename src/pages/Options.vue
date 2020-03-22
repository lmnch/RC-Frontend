<template>
    <q-page style="min-height:75vh">
        <div>
            <div class="list-safezones" style="float: left; width: 60wh; height: 10wh; text-align: center"> Savezones </div>
            <div id="add"> 
                  <img class="options-icon" src="~assets/plus.png" v-on:click="add"/> 
            </div> <br>
            <input type="text" id="candidate" style="width:100vw;" /> <br>
            <ul id="dynamic-list" class="listElements">
            </ul>
            
            <!-- these are important dont delete them -->
            <img src="~assets/Trashcan.png" style="display:none" id="myTrashcan" class="options-icon"> <img>
            <button v-on:click="clearAll" style="display:none;"> Löschen </button>
            <button id="btnSave" v-on:click="save" style="display:none;"></button> 
        </div>
    </q-page>
</template>

<script>
export default {
  name: 'PageMap',
  methods: {
      clearAll: function(){
            this.$q.localStorage.clear();
      },
      save: function(){
            let key = "counter";
            let currentCounter;
            try {
                currentCounter = this.$q.localStorage.getItem(key); // gets the current counnter
                if (currentCounter == null)
                {
                    currentCounter = 0;
                }
                console.log("currentCounter: " + currentCounter);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        //console.log(position);
                        this.$q.localStorage.set("Latitude:" + currentCounter, position.coords.latitude);
                        this.$q.localStorage.set("Longitude:" + currentCounter, position.coords.longitude);
                        console.log(this.$q.localStorage.getItem("Latitude:" + currentCounter) + " " + this.$q.localStorage.getItem("Longitude:" + currentCounter));
                    });
                } else { 
                    console.log("Geolocation is not supported by this browser.");
                }

                this.$q.localStorage.set(key, (currentCounter + 1)); // incerases counter and saves i
            } catch (e) {
                // data wasn't successfully saved due to
                // a Web Storage API error
                console.log("error cant get your position");
            }

            window.location.reload();
        },
        add: function(){

            let currentCounter = this.$q.localStorage.getItem("counter"); // gets the current counnter
            if (currentCounter == null)
            {
                currentCounter = 0;
            }

            var ul = document.getElementById("dynamic-list");
            var candidate = document.getElementById("candidate");
            var li = document.createElement("li");
            var br = document.createElement("br");
            li.setAttribute("id","li:Text:"+currentCounter);
            br.setAttribute("id","br:Text:"+currentCounter);
            li.appendChild(document.createTextNode(candidate.value));

            this.$q.localStorage.set("Text:" + currentCounter, candidate.value)
            console.log(this.$q.localStorage.getItem("Text:"+currentCounter));

            let myimg= document.getElementById("myTrashcan").cloneNode(true);
            myimg.onclick=function(){
                document.getElementById("li:"+event.target.name).remove();
                document.getElementById("br:"+event.target.name).remove();
                this.$q.localStorage.remove(event.target.name);
            }
            myimg.setAttribute("style", "display:block;");
            myimg.setAttribute("name", "Text:"+currentCounter);
            li.appendChild(myimg);
            ul.appendChild(li);
            ul.appendChild(br);


            document.getElementById("btnSave").click();
        }
    }
}

import { LocalStorage, SessionStorage } from 'quasar';
setTimeout(() => {
    let c = LocalStorage.getItem("counter");
    if (c == null)
        c = 0;
    for (let index = 0; index < c; index++){
        console.log(LocalStorage.getItem("Text:" + index));
        let text = LocalStorage.getItem("Text:" + index);
        if(text != null){
            var ul = document.getElementById("dynamic-list");
            var candidate = document.getElementById("candidate");
            var li = document.createElement("li");
            var br = document.createElement("br");
            li.setAttribute("id","li:Text:"+index);
            br.setAttribute("id","br:Text:"+index);
            li.appendChild(document.createTextNode(text));

            LocalStorage.set("Text:" + index, text)
            console.log(LocalStorage.getItem("Text:"+index));


            let myimg= document.getElementById("myTrashcan").cloneNode(true);
            myimg.onclick=function(){
                document.getElementById("li:"+event.target.name).remove();
                document.getElementById("br:"+event.target.name).remove();
                LocalStorage.remove(event.target.name);
            }
            myimg.setAttribute("style", "display:block;");
            myimg.setAttribute("name", "Text:"+index);
            li.appendChild(myimg);
            ul.appendChild(li);
            ul.appendChild(br);

        }
    }
}, 100);

</script>