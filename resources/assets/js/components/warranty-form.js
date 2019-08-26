window.VueComponent['warranty-form'] = Vue.component('warranty-form', {
    template: '#warranty-form',
    extends : window.VueComponent['ninecon-prod'],
    computed: {
        searchFilters: function(){
            return [{
                field: "FAMILYNAME",
                fromval:  "גרילים",
                toval: "גרילים",
                op: "=",
                sort: 1,
                isdesc: 1,
            }]
        }
    },
    methods : {
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
                    case 'file' :
                        if(!that.checkFile()){
                            $this.addClass('is-invalid');
                            invalid++;
                        }
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
        processing : async function(){
            let that = this;
            let nameUnique = [that.fullName, that.phoneMobile].join(' - ');
            that.showLoader(true, "נא להמתין מספר שניות עד הסיום העברת נתונים...");
            this.DOCUMENTS_Q.fieldUpdate('CUSTNAME', this.CUSTNAME)
                .then(function(){
                        return that.DOCUMENTS_Q.fieldUpdate('CDES', that.fullName);
                    },
                    function(){
                        return that.DOCUMENTS_Q.fieldUpdate('CDES', that.fullName);
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
                    return that.DOCUMENTS_Q.fieldUpdate('PARTNAME', that.product)
                })
                .then(function(){
                    return that.DOCUMENTS_Q.fieldUpdate('PARTNAME', that.product)
                }, function(){
                    return that.DOCUMENTS_Q.fieldUpdate('PARTNAME', that.product)
                })
                .then(function(){
                    return that.DOCUMENTS_Q.saveRow(0);
                })
                .then(function(){
                    return that.DOCUMENTS_Q.startSubForm('CUSTPERSONNEL', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(CUSTPERSONNEL){
                        that.CUSTPERSONNEL = CUSTPERSONNEL;
                        return that.CUSTPERSONNEL.newRow();
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('NAME', nameUnique);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('HOMEPHONE', that.phoneHome);
                },function(){
                    that.showLoader(false);
                    alert('רשומה זו כבר קיימת במסך');
                    window.location.reload();
                    throw new Error('רשומה זו כבר קיימת במסך');
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('CELLPHONE', that.phoneMobile);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.fieldUpdate('PHONENUM', that.phoneMobile);
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
                })
                .then(function(){
                    return that.BILLTO.saveRow(1);
                })
                .then(function(){
                    return that.CUSTPERSONNEL.endCurrentForm();
                })
                .then(function(){
                    return that.DOCUMENTS_Q.choose('NAME', nameUnique)
                })
                .then(function(){
                    return that.DOCUMENTS_Q.saveRow(0);
                })
                .then(function(){
                    return that.DOCUMENTS_Q.startSubForm('DOCTEXT_Q_2', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(DOCTEXT_Q_2){
                        that.DOCTEXT_Q_2 = DOCTEXT_Q_2;
                        let text = [that.serial, that.freetext].filter(field => field.length).join(" \n\r");
                        return that.DOCTEXT_Q_2.saveText(text, 0,0,0);
                })
                .then(function(){
                    return that.DOCTEXT_Q_2.endCurrentForm();
                })
                .then(function(){
                    return that.DOCUMENTS_Q.startSubForm('EXTFILES', that.showMessage, that.updateFieldsCallback);
                })
                .then(function(EXTFILES){
                    that.EXTFILES = EXTFILES;
                    let kabalaImage = $(that.$el).find('#file')[0].files;
                    return that.saveImages(0, kabalaImage);
                });
        }
    }
});