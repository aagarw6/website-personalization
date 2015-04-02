DummyDataGenerator = (function() {
    var self = {};

    var userAgent = navigator.userAgent;
	var generateRandomNumber = function(min, max) {
        return Math.floor((Math.random() * max) + min);
    };
    var seededRandom = function(min, max)
    {
		if (!Math.seed) Math.seed = (new Date).getTime();
        max = max || 1;
        min = min || 0;
        Math.seed = (Math.seed * 9301 + 49297) % 233380;
        var rnd = Math.abs(Math.seed / 233280);

        return min + rnd * (max - min);
    }

    String.prototype.hashcode = function() {
        var hash = 0;
        var i, chr, len;
        if (this.length == 0)
            return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // convert to 32bit integer
        }
        return hash;
    };




    var generateRandomList = function(list) {
        //generate a random number of items for the new list which is less than or equal to the length of the given list
        var itemsCount = Math.floor(seededRandom(0, list.length-1));
		var newList = [];

        //generate itemsCount number of items and add to newlist 
		
		var randomIndex = Math.floor(seededRandom(0, list.length));
        for(var i = 0; i < itemsCount; i++) {
			var index = (randomIndex + i > list.length - 1) ? randomIndex + i - list.length : randomIndex + i
            var newItem = list[index];
            newList.push(newItem);
        }
        return newList;
    };

    self.MakeDigilantData = function(profile) {
        var jsonDigilantData = {
        	id: userAgent.hashcode(),
            persona: '',
            micro_persona: [],
            iab_segments: []
        };

        var personaList = ['Jeff', 'Julie', 'Stanley'];
        var microPersonaList = [
            ['Jeff 1', 'Jeff 2', 'Jeff 3', 'Jeff 4', 'Jeff 5', 'Jeff 6', 'Jeff 7'],
            ['Julie 1', 'Julie 2', 'Julie 3', 'Julie 4', 'Julie 5', 'Julie 6', 'Julie 7'],
            ['Stanley 1', 'Stanley 2', 'Stanley 3', 'Stanley 4', 'Stanley 5', 'Stanley 6', 'Stanley 7']
        ];
        var iabList = [
            ['IAB1 - 7', 'IAB12', 'IAB13', 'IAB13 - 4', 'IAB13 - 8', 'IAB13 - 9', 'IAB13 - 10', 'IAB13 - 11', 'IAB17', 'IAB19'],
            ['IAB9', 'IAB10', 'IAB13 - 2', 'IAB19', 'IAB22'],
            ['IAB7', 'IAB9', 'IAB13 - 10', 'IAB13 - 6', 'IAB13 - 7', 'IB13 - 8', 'IAB13 - 9', 'IAB20']
        ];

        if (typeof profile === "number") Math.seed = profile;
        else Math.seed = userAgent.hashcode();
        var personaRandomSelection = Math.floor(seededRandom(0, personaList.length));
		jsonDigilantData.persona = personaList[personaRandomSelection];
		jsonDigilantData.micro_persona = generateRandomList(microPersonaList[personaRandomSelection]);
		jsonDigilantData.iab_segments = generateRandomList(iabList[personaRandomSelection]);
		return jsonDigilantData;
    }

    return self;
})();
	
	var seedTest = function (seed)
					{ 
					console.log("seedtest call");
					console.log(DummyDataGenerator.MakeDigilantData(seed));
					}
	
	