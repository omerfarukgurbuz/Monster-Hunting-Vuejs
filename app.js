new Vue ({
    el: "#app",
    data:{
        player_heal: 100,
        monster_heal: 100,
        game_is_on:false,
        attack_multiple:10,
        special_at_multiple: 25,
        heal_up_multiple:20,
        monster_at_multiple:20,
        logs: [],
        log_text: {
            attack: "Oyuncu Saldirisi:",
            special_attack: "Ozel Oyuncu Atagi:",
            monster_attack: "Canavar Saldirisi:",
            heal_up: "İlk Yardim:",
            give_up: "Oyuncu Pes Etti:"
        }
    },
    methods:{  
                                        // Button actions
        start_game: function(){
            this.game_is_on=true;
        },

        attack: function(){
            var point = Math.ceil(Math.random()*this.attack_multiple);
            this.monster_heal -= point;
            this.add_to_log({ turn:"p" , text: this.log_text.attack + point  });
            this.monster_attack();       
           
        },

        special_attack: function(){
            var point = Math.ceil(Math.random()*this.special_at_multiple) ;
            this.monster_heal -= point;
            this.add_to_log({ turn:"p" , text: this.log_text.special_attack + point  });
            this.monster_attack();           
        },

        heal_up: function(){
            var point = Math.ceil(Math.random()*this.heal_up_multiple);
            this.player_heal += point;
            this.add_to_log({ turn:"p" , text: this.log_text.heal_up + point });
            this.monster_attack();       
        },

        give_up: function(){
            this.player_heal = 0;
            this.add_to_log({ turn:"p" , text: this.log_text.give_up + point });
        },

        monster_attack: function(){
            var point = Math.ceil(Math.random()*this.monster_at_multiple);
            this.player_heal -= point;
            this.add_to_log({ turn:"m" , text: this.log_text.monster_attack + point  });
        },

        add_to_log: function(log){
            this.logs.push(log);
        }
     

    },
    watch: {
        player_heal: function(value){   //canlarin takip edilmesi
            if(value <= 0){
                this.player_heal = 0; 
                if(confirm("Oyunu kaybettin agla :( . Yeniden ?")){
                    this.player_heal=100;
                    this.monster_heal=100;
                    this.logs = [];
                }
            }else if (value >= 100){
                this.player_heal = 100;
            }
        },
        monster_heal: function(value){
            if(value <= 0){
                this.monster_heal = 0;
                if(confirm("Oyunu kazandın. Yeniden ?")){
                    this.player_heal=100;
                    this.monster_heal=100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        userProgres: function(){
            return {
                width: this.player_heal + "%"}
        },
        monsterProgres: function(){
            return {
                width: this.monster_heal + "%"}
        }
    }
})