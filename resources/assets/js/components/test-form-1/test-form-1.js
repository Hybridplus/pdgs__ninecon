window.VueComponent['test-form-1'] = Vue.component('test-form-1', {
    template: '#test-form-1',
    data: function () {
        return {
            CUSTNAME : "155222",
            fullName: "test test",
            address: "test address",
            phoneHome: "03123123",
            phoneMobile: "050-8284111",
            email: "test@test.test",
            brand: "",
            product: "",
            serial: "",
            date: "2018-03-12",
            freetext: "test free text"
        }
    },
    computed: {
        brandOptions: function () {
            return [
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
        },
        productOptions: function () {
            switch (this.brand){
                case "פלטינום":
                    return [
                        "פלטינום 400",
                        "פלטינום 710",
                        "פלטינום 810",
                        "פלטינום 850",
                        "פלטינום יחידת אחסון מודולרית",
                        "פלטינום יחידת ארון לכיור מודולרית",
                        "פלטינום יחידת פינה מודולרית",
                        "פלטינום יחידת אחסון למקרר"
                    ];
                case "ברויל" :
                    return [
                        "ברויל 600"
                    ];
                case "גלקסי":
                    return [
                        "גלקסי 2 שחור",
                        "גלקסי 2 נירוסטה",
                        "גלקסי 3 שחור",
                        "גלקסי 3 נירוסטה",
                        "גלקסי 4 שחור",
                        "גלקסי 4 נירוסטה",
                        "גלקסי משולב פחמים",
                        "גלקסי יחידת ארון  לכיור מודולרית",
                        "גלקסי יחידת אחסון למקרר"
                    ];
                case "רבולושן":
                    return [
                        "רובלושן 2",
                        "רבולושן 3 שחור",
                        "רבולושן 3 נירוסטה",
                        "רבולושן 3 מגורגר",
                        "רבולושן 4 שחור",
                        "רבולושן 4 נירוסטה",
                        "רבולושן 4 מגורגר",
                        "רבולושן משולב פחמים",
                        "רבולושן יחידת אחסון מודולרית",
                        "רבולושן יחידת ארון לכיור מודולרית",
                        "רבולושן יחידת פינה מודולרית",
                        "רבולושן יחידת אחסון למקרר"
                    ];
                case "עילית":
                    return [
                        "עילית 4 שחור"
                    ];
                case "פרימיום":
                    return [
                        "גריל פרימיום 6 מבערים",
                        "גריל פרימיום 4 מבערים",
                        "כיור פרימיום שיש לבן",
                        "כיור פרימיום שיש שחור",
                        "מקרר דלת זכוכית פרימיום שיש לבן",
                        "מקרר דלת זכוכית פרימיום שיש שחור",
                        "מקרר דלת כפולה פרימיום שיש לבן",
                        "מקרר דלת  כפולה  פרימיום שיש שחור",
                        "יחידת אחסון פרימיום שיש לבן",
                        "יחידת אחסון פרימיום שיש שחור",
                        "יחידת פינה פרימיום",
                        "מקפיא דלת זכוכית פרימיום שיש לבן",
                        "מקפיא דלת זכוכית פרימיום שיש שחור",
                        "מעטפת למקרר 118 ליטר פרימיום שיש לבן",
                        "מעטפת למקרר 118 ליטר פרימיום שיש שחור",
                        "מעטפת למקרר 2 מגירות פרימיום שיש לבן",
                        "מעטפת למקרר 2 מגירות פרימיום שיש שחור",
                        "גריל בילדאין פרימיום 4 מבערים עם כירת צד",
                        "גריל בילדאין פרימיום 6 מבערים עם כירת צד",
                        "גריל בילדאין פרימיום 4 מבערים",
                        "כירת צד פרימיום דרופ אין"
                    ];
                case "אלפא":
                    return [
                        "גריל בילדאין אלפא 3 מבערים",
                        "גריל בילדאין אלפא 3 מבערים",
                        "גריל  אלפא 4 מבערים על עגלה"
                    ];
                case "אפיק":
                    return [
                        "אפיק גריל 4 מבערים",
                        "אפיק כיור",
                        "אפיק מקרר",
                        "מעטפת למקרר 118 ליטר אפיק "
                    ];
                case "לג'נד":
                    return [
                        "גריל בילטאין לג'נד 4 מבערים"
                    ];
            }
        },
        url : function () {
            const url = 'https://9-cp-test.wee.co.il/';
            const proxy = '/proxy?url=';
            return proxy + url;
        },
        config : function () {
            return {
                url: this.url,
                tabulaini:"tabula.ini",
                language:1,
                company: 'ninecon',
                username:"service03",
                password: "galil1234",
                devicename:''
            }
        }
    },
    beforeMount : function () {
        let that = this;
        window.vm = this;
        $('body').on('loginReady', function() {
            if (window.isPriorityReady) {
                login(that.config).then(function(response){
                    return formStart('FAMILY_LOG', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(FAMILY_LOG){
                    console.groupCollapsed("FAMILY_LOG");
                    console.log(FAMILY_LOG);
                    console.groupEnd();
                    that.FAMILY_LOG = FAMILY_LOG;
                    that.getSearch(that.FAMILY_LOG, 'FAMILYNAME');
                    return formStart('DOCUMENTS_Q', that.showMessage, that.updateFieldsCallback);
                })
                .then(function (DOCUMENTS_Q) {
                    console.groupCollapsed("DOCUMENTS_Q");
                    console.log(DOCUMENTS_Q);
                    that.DOCUMENTS_Q = DOCUMENTS_Q;
                    console.groupEnd();
                });
            }
        });
    },
    mounted : function () {
        if(!this.brand){
            this.$set(this, 'brand', this.brandOptions[0]);
        }

        $(this.$el).find(":input").each(function(){
            let $this = $(this);
            $this.on('change focus', function(){
                $(this).removeClass('is-invalid');
                $(this).removeClass('is-valid');
            });
        });
    },
    watch: {
        brand: function ($new, $old){
            if($new !== $old){
                this.$set(this, 'product', this.productOptions[0])
            }
        },
        file : function ($new, $old){
            console.log($new, $old);
        }
    },
    methods : {
        showMessage : function (message) {
            console.log("Show message", message);
            message.form.warningConfirm(1);
            // if (message.type != "warning") {
            //     // alert(message.message);
            // } else {
            //     if (confirm(message.message)) {
            //         message.form.warningConfirm(1);
            //     } else {
            //         message.form.warningConfirm(0);
            //     }
            // }
        },
        updateFieldsCallback : function (result){
            console.groupCollapsed('Update Fields Callback')
            console.info(result)
            console.groupEnd();
            return true;
        },
        checkForm : function (e) {
            let that = this;
            let invalid = 0;
            $(this.$el).find(":input").each(function(){
                let $this = $(this);
                if($this.prop('required')){
                    if(!$this.val()){
                        $this.addClass('is-invalid');
                        invalid++;
                    }
                }
                let re;
                switch ($this.prop('type')) {
                    case 'email' :
                        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(!re.test($this.val())){
                            $this.addClass('is-invalid');
                            invalid++;
                        }
                        break;
                    case 'tel' :
                        // re = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
                        // if(!re.test($this.val())){
                        //     $this.addClass('is-invalid');
                        //     invalid++;
                        // }
                        break;
                }
                if(!$this.hasClass('is-invalid'))
                    $this.addClass('is-valid');
            });
            e.preventDefault();
            if(!invalid) {
                that.processing();
            }
        },
        checkFile : function ($event) {
            let file = $event.target.files[0];
            let availableTypes = ['image/jpeg',  'image/png'];
            if(!(availableTypes.indexOf(file.type) + 1)){
                $event.target.value = "";
                alert("Available types: .jpeg, .jpg, .png");
            }

            if(file.size > 1048576) {
                $event.target.value = "";
                alert("Max file size 1mb");
            }
        },
        getSearch : function (context, field, searchResults){
            let that = this;
            // context.searchAction(1, "גרילים").then(console.log, console.log);
            // return;
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
        processing : async function(){
            let that = this;
            // this.DOCUMENTS_Q.newRow().then(function(){
            //     return that.DOCUMENTS_Q.fieldUpdate('CUSTNAME', that.CUSTNAME)
            // })

            this.DOCUMENTS_Q.fieldUpdate('CUSTNAME', this.CUSTNAME)
                .then(function(){
                    return that.DOCUMENTS_Q.fieldUpdate('CDES', that.fullName)
                },
                function(){
                    return that.DOCUMENTS_Q.fieldUpdate('CDES', that.fullName)
                })
                .then(function(){
                    return that.DOCUMENTS_Q.fieldUpdate('SBD_PURDATE', moment(that.date).format('DD/MM/YY'))
                })
                .then(function(){
                    return that.DOCUMENTS_Q.fieldUpdate('SYMCODE', '900')
                })
                .then(function(){
                    return that.DOCUMENTS_Q.fieldUpdate('CALLTYPECODE', 'צידניות')
                })
                .then(function(){
                    return that.DOCUMENTS_Q.saveRow(0);
                })
                .then(function(){
                    return that.DOCUMENTS_Q.startSubForm('CUSTPERSONNEL', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(CUSTPERSONNEL){
                    that.CUSTPERSONNEL = CUSTPERSONNEL;
                    return that.CUSTPERSONNEL.fieldUpdate('HOMEPHONE', that.phoneHome);
                },
                function(fail) {
                    console.groupCollapsed("fail to start subform CUSTPERSONNEL");
                    console.log(fail);
                    console.groupEnd();
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('CELLPHONE', that.phoneMobile);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('EMAIL', that.email);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.saveRow(0);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.startSubForm('BILLTO', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(BILLTO){
                    that.BILLTO = BILLTO;
                    return that.BILLTO.fieldUpdate('ADDRESS', that.address);
                },
                function(fail) {
                    console.groupCollapsed("fail to start subform BILLTO");
                    console.log(fail);
                    console.groupEnd();
                })
                .then(function(){
                    return that.BILLTO.saveRow(1);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.endCurrentForm();
                })
                .then(function(){
                    return that.DOCUMENTS_Q.startSubForm('EXTFILES', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(EXTFILES){
                    that.EXTFILES = EXTFILES;
                    if($(that.$el).find('#file')[0].files.length)
                        return that.EXTFILES.uploadFile($(that.$el).find('#file')[0].files[0]);
                    else
                        return that.EXTFILES.endCurrentForm();
                },
                function(fail) {
                    console.groupCollapsed("fail to start subform EXTFILES");
                    console.log(fail);
                    console.groupEnd();
                })
                .then(function(){
                    return that.EXTFILES.saveRow(1);
                })
                .then(function(){
                    alert('congratulation!!! operation finish successfully');
                });
        }
    }
});