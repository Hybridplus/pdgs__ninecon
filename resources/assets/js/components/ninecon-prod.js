window.VueComponent['ninecon-prod'] = Vue.component('ninecon-prod', {
    data : function (){
        return {
            CUSTNAME : "155222",
            fullName: "",
            address: "",
            phoneHome: "",
            phoneMobile: "",
            email: "",
            brand : "",
            product: "",
            serial: "",
            date: "",
            freetext: "",
            parts : {},
            sorted : {},
            type : '',
            // custom lang
            lang: {
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                placeholder: {
                    date: '',
                    dateRange: 'Select Date Range'
                }
            },
        }
    },
    computed : {
        defaultBrands : function(){
            let original = [
                "פלטינום",
                "ברויל",
                "גלקסי",
                "רבולושן",
                "עילית",
                "פרימיום",
                "אלפא",
                "אפיק",
                "לג'נד"
            ];
            original.push("קולמן");
            original.push("לנדמן");
            original.push("מאסטר");

            original.push("סאנדום");
            original.push("בין רגע");
            original.push("מונטנה");
            original.push("קורטס אוקטגון");

            original.push("אחר");
            return original;
        },
        typeOptions: function(){
            return Object.keys(this.sorted).sort();
        },
        brandOptions: function () {
            let filtred = _.filter(_.map(this.sorted[this.type] || {}, function(o,k){if(o.length) return k;}), function (o){ return o;}) || [];
            return this.defaultBrands.filter(value => -1 !== filtred.indexOf(value))
        },
        productOptions : function (){
            return _.sortBy(this.sorted && this.sorted[this.type] && this.sorted[this.type][this.brand] ? this.sorted[this.type][this.brand] : [{}], 'title');
        },
        url : function () {
            const url = 'https://9-cp.wee.co.il/';
            const proxy = '/proxy?url=';
            return baseUrl + proxy + url;
        },
        config : function () {
            return {
                url: this.url,
                tabulaini:"tabula.ini",
                language:1,
                company: 'ninecon',
                username:"service03",
                password: "1234",
                devicename:''
            }
        }
    },
    beforeMount : function () {
        let that = this;
        window.vm = this;
        $('body').on('loginReady', function() {
            if (window.isPriorityReady) {
                that.showLoader(true);
                login(that.config).then(function(response){
                    return formStart('FAMILY_LOG', that.showMessage, that.updateFieldsCallback);
                })
                    .then(function(FAMILY_LOG){
                        that.FAMILY_LOG = FAMILY_LOG;
                        that.getSearch(that.FAMILY_LOG, 'FAMILYNAME');
                        return formStart('PART', that.showMessage, that.updateFieldsCallback);
                    })
                    .then(function(PART){
                        that.PART = PART;
                        that.PART.setSearchFilter({
                            or: 0,
                            ignorecase: 0,
                            QueryValues: that.searchFilters

                        });
                        that.getParts(that.PART);
                        return formStart('DOCUMENTS_Q', that.showMessage, that.updateFieldsCallback);
                    })
                    .then(function (DOCUMENTS_Q) {
                        that.DOCUMENTS_Q = DOCUMENTS_Q;
                        that.showLoader(false);
                    });
            }
        });
    },
    mounted : function () {
        $('[data-toggle="popover"]', $(this.$el)).popover({
            container: $("#serial").parent(),
            title: $($("#popover-template").text()).find(".popover-header"),
            content : $($("#popover-template").text()).find(".popover-body").html(),
            trigger: "click, focus, hover",
            html: true
        });

        $(".js-serial-toogle").click(function () {
            $('#serial').trigger('focus');
        });
        $(this.$el).find(":input").each(function(){
            let $this = $(this);
            $this.on('change focus', function(){
                $(this).removeClass('is-invalid');
                $(this).removeClass('is-valid');
            });
        });
    },
    watch: {
        type : function($new, $old){
            if($new && $new !== $old){
                this.$set(this, 'brand', this.brandOptions[0]);
            }
        },
        brand: function ($new, $old){
            if($new)
                this.$set(this, 'product', this.productOptions[0].value)
        },
        file : function ($new, $old){
        }
    },
    methods : {
        sortParts : function () {
            let sorted = {},
                that = this,
                parts = _.groupBy(this.parts, 'FAMILYNAME');
                this.testParts = $.extend(true, {}, this.parts);

            _.map(parts, function(family, familyKey){
                if(familyKey === 'אוהלים')
                    familyKey = 'קמפינג';
                _.map(family, function (o) {
                    let flag = true;
                    for(let i in that.defaultBrands){
                        if(o.PARTDES.indexOf(" " + that.defaultBrands[i]) + 1) {
                            flag = false;
                            if(!sorted[familyKey]) sorted[familyKey] = {};
                            if(!sorted[familyKey][that.defaultBrands[i]]) sorted[familyKey][that.defaultBrands[i]] = [];
                            sorted[familyKey][that.defaultBrands[i]].push({
                                value: o.PARTNAME,
                                title: o.PARTDES
                            });
                            break;
                        }
                    }
                    if(flag){
                        if(!sorted[familyKey]) sorted[familyKey] = {};
                        if(!sorted[familyKey]['אחר']) sorted[familyKey]['אחר'] = [];
                        sorted[familyKey]['אחר'].push({
                            value: o.PARTNAME,
                            title: o.PARTDES
                        });
                    }
                });
            });

            this.$set(this, 'sorted', sorted);
            that.$set(that, 'type', that.typeOptions[0] || '');
            that.$set(that, 'brand', that.brandOptions[0] || '');
            that.$set(that, 'product', that.productOptions[0].value || '');
        },
        showMessage : function (message) {
            message.form.warningConfirm(1);
        },
        updateFieldsCallback : function (result){
            return true;
        },
        checkFile : function ($event) {
            var file = _.get($event, 'target.files.0', $(this.$el).find('#file')[0].files[0]);
            if(!file)
                return false;

            let availableTypes = ['image/jpeg',  'image/png'];
            if(!(availableTypes.indexOf(file.type) + 1)){
                $event.target.value = "";
                alert("Available types: .jpeg, .jpg, .png");
                return false;
            }

            if(file.size > 1048576 * 10) {
                $event.target.value = "";
                alert("Max file size 10mb");
                return false;
            }
            return true;
        },
        checkFiles : function ($event) {
            var files = _.get($event, 'target.files', $(this.$el).find('#takalot')[0].files);
            let flag = true;
            _.each(files, function(file){
                let availableTypes = ['image/jpeg',  'image/png'];
                if(!(availableTypes.indexOf(file.type) + 1)){
                    $event.target.value = "";
                    alert("Available types: .jpeg, .jpg, .png");
                    flag = false;
                }

                if(file.size > 1048576 * 10) {
                    $event.target.value = "";
                    alert("Max file size 10mb");
                    flag = false;
                }
            });

            return flag;
        },
        getSearch : function (context, field, searchResults){
            let that = this;
            if(!searchResults) {
                context.choose(field,'',function(results){
                    that.storeSearchResults(context.name, field, results);
                    that.getSearch(context, field, results);
                });
            } else if (!!searchResults && searchResults.next) {
                context.searchAction(searchResults.next).then( function(results){
                    that.storeSearchResults(context.name, field, results);
                    that.getSearch(context, field, results);
                });
            }
        },
        storeSearchResults : function (contextName, field, searchResults) {
            if(!this.storedResults) this.storedResults = {};
            if(!this.storedResults[contextName]) this.storedResults[contextName] = {};
            if(!this.storedResults[contextName][field]) this.storedResults[contextName][field] = [];

            let key;

            if(searchResults.SearchLine)
                key = 'SearchLine';
            else if(searchResults.ChooseLine)
                key = 'ChooseLine';
            else return;

            for(let i = 0; i < searchResults[key].length; i++){
                this.$set(this.storedResults[contextName][field], this.storedResults[contextName][field].length, searchResults[key][i]);
            }
        },
        getParts   : function(context, results, index = 1) {
            let that = this;
            if(!that.parts) that.parts = {};
            context.getRows(index).then(function(results){
                results = results[context.name];
                if(Object.keys(results).length) {
                    that.$set(that, 'parts', $.extend(true, that.parts, results));
                    index = +(Object.keys(that.parts)[Object.keys(that.parts).length - 1]) + 1;
                    that.getParts(context, true, index);
                } else {
                    that.sortParts();
                }
            })
        },
        redirect : function (){
            window.location.href = baseUrl + "/finish";
        },
        showLoader : function (show = true, message = "נא להמתין...") {
            $('.modal .modal-footer p').text(message);
            $('.modal').modal(show ? 'show' : 'hide');
        },
        saveImages : function(index = 0, files, callback, callbackParams){
            let that = this;
            that.EXTFILES.uploadFile(files[index],function (response) {
                if(response.isLast){
                    return that.EXTFILES.fieldUpdate('EXTFILENAME', that.EXTFILES.getFileUrl(response.file)).then(function(){
                        that.EXTFILES.saveRow(0).then(function(){
                            index++;
                            if(files[index]){
                                return that.EXTFILES.newRow().then(function(){
                                    return that.saveImages(index,files, callback, callbackParams);
                                });
                            } else if (callback && callbackParams && callbackParams.length){
                                return that.EXTFILES.newRow().then(function() {
                                    return callback(0, callbackParams)
                                });
                            } else {
                                that.showLoader(false);
                                that.redirect();
                            }
                        });
                    });
                }
            });
        },
        testPart : function(parts, attempt = 0){
            let that = this;
            let part = parts.pop();
            that.DOCUMENTS_Q.fieldUpdate("PARTNAME", part.PARTNAME, function(){
                console.warn("successful from attempt " + attempt + ": " + part.PARTNAME + " " + part.PARTDES)
                console.warn("successful length " + parts.length);
                that.testPart(parts, 0)
            }, function () {
                console.error("fail from attempt " + attempt + ": " + part.PARTNAME + " " + part.PARTDES);
                if(attempt < 3) {
                    parts.push(part);
                    that.testPart(parts, attempt++);
                } else {
                    that.testPart(parts, 0);
                }
            });
        }
    }
});