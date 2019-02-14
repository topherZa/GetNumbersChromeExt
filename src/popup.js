let findBtn = document.getElementById('FindButton');


findBtn.onclick = function (element) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `
                
                document.addEventListener('mousedown', mouseDownCallback, false);

                
                
                
                function mouseDownCallback(event) {

                    try {
                        let regex = /\\+/g;
                        if (event.target.title.match(regex)) {
                            let arr = event.target.title.split(',');
                
                            for (let a of arr) {
                                a = a.replace(' ', '').replace('&nbsp;', '');
                            }
                            let str = arr.join();
                
                            saveText("default_name.txt", str);
                          
                        }
                        else {
                            alert("Couldn't find something that looks like a number please re-click find and select the title of the group with the numbers");
                        }
                    }
                    catch (err) {
                        alert(err);
                    }
                    finally {
                        document.removeEventListener('mousedown', mouseDownCallback);
                    }
                }
                
                function saveText(filename, text) {
                    var tempElem = document.createElement('a');
                    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                    tempElem.setAttribute('download', filename);
                    tempElem.click();
                 }
        
                
            `}

        );
    });
};




