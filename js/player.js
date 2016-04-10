!(function(module){
    if(!module&&module.Player){module={Player:{}};}
    var ELE = {
        _playBtn:$(".play"),//play btn
        _stopBtn:$(".stop"),//stop btn
        _progress:$(".loading"),//loading progress bar
    };

    function bindEvent(){
        ELE._playBtn.on("click",handlers.playAndPause);//play event
        ELE._stopBtn.on("click",handlers.stopAudio);//stop event
    }
    var handlers={
        stopAudio:function(){
            // console.log("====stop-=");
            ELE._progress.width(0);
            ELE._playBtn.removeClass("pause");
        },
        autoplay:function(){
            $("#playerId").jPlayer("play");
            this.playAndPause();
        },
        init:function(evt){
            // console.log("=====ready");
            $(this).jPlayer("setMedia", {
                title: "Web Audio",
                // mp3: "audio/guanghuisuiyue.mp3",
                m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
            }).jPlayer("onProgressChange",function(loadPercent,ppr,ppa){
                console.log("===progress==",loadPercent,"===",ppa);
            }).jPlayer("getData",function(){
                console.log("=====getData====")
            });

            // handlers.autoplay();
        },
        playAndPause:function(){
            ELE._playBtn.toggleClass("pause");
        },
        onLoadProcess:function(evt){
            console.log("=====load process=====");
            var _targetEle = evt.currentTarget;
            var _audio;
            if(_targetEle.tagName==="audo"){
                _audio = _targetEle;
            }else{
                _audio = $(_targetEle).find("audio")[0];
            }
            if(_audio){
                var _buf = _audio.buffered;
                // console.log("===buff==",_buf.length);

                //duration is ok
                if(_buf.length>0){
                    //current loading progress = get loading time / duration
                    var _loadprogress = Math.floor(_buf.end(0)*100/_audio.duration);
                    // console.log("====>00==",_loadprogress);
                    ELE._progress.width(_loadprogress+"%");
                }
            }
        },
        onLoadStart:function(){console.log("=====loadstart");},
        onLoadedMetadata:function(){console.log("=====loadedmetadata");},
        onPlayEnded:function(){console.log("=====play ended===");ELE._progress.width(0);},
        onLoadError:function(evt){console.log("=====load error",evt.jPlayer.error.message);},
        onSeeking:function(){console.log("=====seeking===");},
        onLoadedData:function(){console.log("=====loadeddata");},
        onTimeupdate:function(evt){
         //    console.log("===updatetime")
         //    if(evt.jPlayer.status.currentTime>60){
             //    console.log("----")
             //    $(this).jPlayer("pause");
         //    }
        },
        onPause:function(){console.log("====pause")},
    };

    function initPlayer(){
        $("#playerId").jPlayer({
            cssSelectorAncestor:"#playerContainerId",
            ready: handlers.init,
            swfPath: "../swf",
            supplied: "mp3,m4a,oga",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: false,
            toggleDuration: true,
            preload:"auto",
            volume:0.3,
            cssSelector:{
               videoPlay:".playerId",
               play:".play",
               stop:'.stop',
               playBar:".process",
               seekBar:".seekbar",
               mute:".mute",
               volumeMax:".voluemax",
               currentTime:".btime",
               duration:".duration",
               title:".title",
               volumeBar:".volumebar_processbg",
               volumeBarValue:".volumebar_process",
            },
            progress:handlers.onLoadProcess,
            loadstart:handlers.onLoadStart,
            loadeddata:handlers.onLoadedData,
            loadedmetadata :handlers.onLoadedMetadata,
            ended:handlers.onPlayEnded,
            seeking:handlers.onSeeking,
            error :handlers.onLoadError,
            timeupdate:handlers.onTimeupdate,
            pause:handlers.onPause,
        });
    }
    module.Player = {
        init:function(){
            initPlayer();
            bindEvent();
        }
    };
})(this);
