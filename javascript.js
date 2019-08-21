$(document).ready(function () {


    console.log("Page loaded");

    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
             $('#recipe-search').trigger('click');
             $('#brewery-search').trigger('click');
             required()
         }
    });

    

    $("#recipe-search").on("click", function () {
        console.log("Button Works");
        var recipe = $("#recipe-input").val().trim();
           if(recipe == ""){
            alert("Please input a Value");
        }
    
        var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=$5de8679b&app_key=$7125a9e371551cc71e6e94ae8b99414c&from=0&to=5";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.hits);
            $(".recipeContainer").empty()
            var recipeArray = response.hits;

            for (var i = 0; i < recipeArray.length; i++) {
                console.log(recipeArray[i]);
                var recipeLabel = recipeArray[i].recipe.label;
                console.log(recipeLabel);
                var recipeImgURL = recipeArray[i].recipe.image;
                console.log(recipeImgURL);
                var recipeCalories = Math.floor(recipeArray[i].recipe.calories);
                console.log(recipeCalories);
                var recipePortions = recipeArray[i].recipe.yield;
                var recipeIngredients = recipeArray[i].recipe.ingredientLines;
                console.log(recipeIngredients);
                var recipePortions = recipeArray[i].recipe.yield;
                console.log(recipePortions)
                var recipeUrl = recipeArray[i].recipe.url;
                console.log(recipeUrl)


                var recipeDiv = $("<div class='recipes'>");
                var imgDiv = $("<img class='images '>");
                var infoDiv = $("<div class='info '>");


                imgDiv.attr("src", recipeImgURL);
                recipeDiv.append(imgDiv);
                recipeDiv.append(infoDiv);
                $(".recipeContainer").append(recipeDiv);
                infoDiv.append("<p><b>Recipe: </b>" + recipeLabel + "</p>");
                infoDiv.append("<p><b>Calories: </b>" + recipeCalories + "</p>");
                infoDiv.append("<p><b>Ingredients: </b>" + recipeIngredients + "</p>");
                infoDiv.append("<p><b>Number of servings: </b>" + recipePortions + "</p>");
                infoDiv.append("<a class='urls' target='_blank' href=" + recipeUrl + ">Try it yourself!</a>");
            }


        
        })
    
    });


    //new lines, not sure if they will work good enough with the front 
    var recipeImg = "";
    // Creating an element to hold the image and assigning at""tributes to it
    var img1 = $("<img>");
    img1.attr("src", recipeImg);
    img1.attr("style", "");
    


    $("#brewery-search").on("click", function () {
        console.log("no");


        var city = $("#brewery-input").val().trim();
        if(city == ""){
            alert("Please enter a value")
            $(".recipeContainer").empty()
        }else{

        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (resbrewery) {
            $(".recipeContainer").empty()
            console.log(resbrewery);

            for (var j = 0; j < resbrewery.length; j++) {
                var breweryName = resbrewery[j].name;
                console.log(breweryName);
                var breweryStreet = resbrewery[j].street;
                console.log(breweryStreet);
                var breweryPhone = resbrewery[j].phone;
                console.log(breweryPhone);
                var breweryURL = resbrewery[j].website_url;
                console.log(breweryURL);


                var breweryDiv = $("<div class='brewery'>");
                var infoBDiv = $("<div class='infoB'>");
                var infoB = {
                    name: breweryName,
                    street: breweryStreet,
                    phone: breweryPhone,
                    url: breweryURL
                }
                breweryDiv.append(infoBDiv);
                $(".recipeContainer").append(breweryDiv);
                console.log(JSON.stringify(infoB))
                infoBDiv.append("<p><b>Brewery Name: </b>" + breweryName + "</p>");
                infoBDiv.append("<p><b>Street Address: </b>" + breweryStreet + "</p>");
                infoBDiv.append("<p><b>Phone Number: </b>" + breweryPhone + "</p>");
                infoBDiv.append("<a class='urls' target='_blank' href=" + breweryURL + ">Check their website out!</a>");

            }


        });

    }
    })
});
