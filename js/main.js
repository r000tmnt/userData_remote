$(document).ready(function(){
    
    function getInfo(){
        $.ajax({
            type: 'get',
            url: './php/access.php',
            success: function(response){
                console.log(JSON.parse(response))
                response = JSON.parse(response)

                var weather_time = new Array()
                var weather_condition = new Array()
                var view_mode = {color: 'light'}
                $('.title').text('使用者: '+response.baseInf.case_name)
                
                let case_info = `<ul><li>使用裝置: ${response.baseInf.usr_device_name}</li><li>使用型號: ${response.baseInf.model_name}</li><li>逆變器: ${response.baseInf.inverter_name}</li>INV量: ${response.baseInf.inv_amount}<li></li><li>型號容量: ${response.baseInf.model_capacity}</li><li>內置容量: ${response.baseInf.built_capacity}</li><li>連結: ${response.baseInf.connettion}</li><li>監測器: ${response.baseInf.monitor}</li><li></li>期限: ${response.baseInf.sell_duration}<li></li>剩餘天數: ${response.baseInf.sell_days_left} 天<li>地點: ${response.baseInf.location_city}${response.baseInf.location_address}</li></ul>`

                $('.case_info').append(case_info)

                for(let i=1; i <= 6; i++){
                    let power_1 = response.curInf["Inverter "+i].V1 * response.curInf["Inverter "+i].I1
                    let power_2 = response.curInf["Inverter "+i].V2 *response.curInf["Inverter "+i].I2
                    let PG_day = response.curInf["Inverter "+i]["PG Day"]
                    let curInf = '<div class="inverter"><h4>逆變器'+ i +'</h4><ul class="power"><li>Power 1: '+ power_1.toFixed(2) +'</li><li>Power 2: '+ power_2.toFixed(2) +'</li><li>PG Day: '+ PG_day +'</li></ul></div>'

                    $('.inverter_list').append(curInf)
                }

                let list = $('.inverter');
                if(list.length > 3){
                    $('.inverter_list').css('width','69vw')
                }
                

                for(weather in response.weather){
                    weather_time.push(weather)
                    weather_condition.push(response.weather[weather])
                }
                weather_time.splice(-1)
                weather_condition.splice(-1)
                for(let i=weather_time.length-1; i >= 0; i--){
                    let time_list = `<li id="${i}" class="time">${weather_time[i]}</li>`
                    $('.time_scroll').append(time_list)
                }
                
                $('.time:eq(0)').addClass('here')

                $('.weather_show').append(`${weather_time[0]}<br>${response.baseInf.weather_location} 天氣 <h1>${weather_condition[0]}</h1>`)

                function check_weather(index){
                    if(weather_condition[index] === '晴'){ $('.weather_show > h1').css('color', 'orange') }
                    if(weather_condition[index] === '多雲'){ $('.weather_show > h1').css('color', 'gray') }                
                }

                check_weather(0)

                function check_viewMode(mode){
                    if(mode === 'light'){ $('.dark').css('opacity', '.7');$('.light').css('opacity', '1') }
                    if(mode === 'dark'){ $('.light').css('opacity', '.7');$('.dark').css('opacity', '1') }
                }

                check_viewMode(view_mode.color)

                $('.dark').click(function(){
                    view_mode.color = 'dark'
                    check_viewMode(view_mode.color)
                    $('body').css({'background':'#27292b', 'color':'#f8f9fa'})
                    $('nav').css('background', '#45494e')
                    $('.box').css('background', '#45494e')
                    $('.weather').css('background', 'linear-gradient(to right, #27292b, #45494e)')
                    $('.time').removeClass('here')
                })

                $('.light').click(function(){
                    view_mode.color = 'light'
                    check_viewMode(view_mode.color)
                    $('body').css({'background':'#f8f9fa', 'color':'#232'})
                    $('nav').css('background', 'white')
                    $('.box').css('background', 'white')
                    $('.weather').css('background', 'linear-gradient(to right, #f8f9fa, #fff)')
                    $('.time').removeClass('here_dark')
                })

                $('.time').mouseover(function(){
                    for(let i=0; i < weather_condition.length; i++){

                        if(view_mode.color === 'dark'){
                            $('.time:eq('+i+')').removeClass('here_dark')
                            $(this).addClass('here_dark')
                        }
                        $('.time:eq('+i+')').removeClass('here')
                        $(this).addClass('here')
                        $('.weather_show').html(`${weather_time[$(this).attr('id')]}<br>${response.baseInf.weather_location}天氣 <h1>${weather_condition[$(this).attr('id')]}</h1>`)
                        check_weather($(this).attr('id'))                        
                    }
                })
            },
            error: function(failed){
                console.log(failed)
            }
        })        
    }

    getInfo();
})