<template>
    <div class="car-brand-site">
        <div class="mainautow">
            <div class="img"><img src="../imgs/aus.jpg" width="100%" /></div>
            <div style="padding:0 30px" class="article1">
                <div class="p0_25 after-service">
                     <table class="table">
                          <thead>
                                <tr>
                                    <td colspan="4">车辆品牌售后服务说明</td>
                                </tr>
                          </thead>
                          <tbody>
                                <tr>
                                    <th class="afs-bg1">NO.</th>
                                    <th class="afs-bg2">品牌</th>
                                    <th class="afs-bg3">官网</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>奥迪</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://contact.audi.cn/dealer_procity.html', txt:'奥迪官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>别克</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.ebuick.com.cn/', txt:'别克官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>奔腾</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://fawcarsales.com/cartag/dealerquery.php', txt:'奔腾官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>宝马</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.bmw.com.cn/cn/zh/general/dealer_locator/introduction.html', txt:'宝马官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>比亚迪</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.bydauto.com.cn/counter-sellpoint.html', txt:'比亚迪官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>奔驰</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://dealer.mercedes-benz.com.cn', txt:'奔驰官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>7</td>
                                    <td>标致</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.peugeot.com.cn/html/dealer/query/', txt:'标致官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>8</td>
                                    <td>宝骏</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.sgmw.com.cn/dealer.htm', txt:'宝骏官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td rowspan="2">9</td>
                                    <td>东风本田</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.wdhac.com.cn/index.php/category/serviceOutlets', txt:'东风本田官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>广汽本田</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.ghac.cn/buy/tools/find-dealer', txt:'广汽本田官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>10</td>
                                    <td>保时捷</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.porsche.com/china/zh/dealersearch/', txt:'保时捷官网'}}">直达官网</a></td>
                                </tr>


                                <tr>
                                    <td>11</td>
                                    <td>北汽幻速</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.baic-hs.com/service.html', txt:'北汽幻速官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>12</td>
                                    <td>长安</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.changan.com.cn/purchase/cx/', txt:'长安官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>13</td>
                                    <td>长城</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.gwm.com.cn/dealer-locator.html', txt:'长城官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>14</td>
                                    <td>东风风神</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dfpv.com.cn/dealers.html', txt:'东风风神官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>15</td>
                                    <td>大众</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.vw.com.cn/zh/purchasingservice/dealersearch.html', txt:'大众官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>16</td>
                                    <td>东风风行</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.fxauto.com.cn/buy.php', txt:'东风风行官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>17</td>
                                    <td>DS</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://ds.com.cn/highlight/dealer', txt:'DS官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>18</td>
                                    <td>道奇</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dodge.cn/service/dealer.html', txt:'道奇官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>19</td>
                                    <td>福特</td>
                                    <!-- <td><a v-link="{name:'third-party',query:{target:'http://www.ford.com.cn/dlpg', txt:'福特官网'}}" target="_blank">直达官网</a></td> -->
                                    <td><a href="http://www.ford.com.cn/dlpg">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td rowspan="2">20</td>
                                    <td>一汽丰田</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.ftms.com.cn/buy/dealer/index.php', txt:'一汽丰田官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>广汽丰田</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.gac-toyota.com.cn/buy/shopping/dealer-search', txt:'广汽丰田官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>21</td>
                                    <td>观致</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.qoros.com/dealers/', txt:'观致官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>22</td>
                                    <td>广汽传祺</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://trumpchi.gacmotor.com/index.php/manage/map', txt:'广汽传祺官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>23</td>
                                    <td>红旗</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.faw-hongqi.com.cn/index.php?s=/Home/Article/index/category/dealer.html', txt:'红旗官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>24</td>
                                    <td>哈弗</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://tools.haval.com.cn/dealer.html', txt:'哈弗官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>25</td>
                                    <td>海马</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://hk.haima.com/jxscx/fwwd.html', txt:'海马官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>26</td>
                                    <td>华泰</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.hawtaimotor.com/list-35-1.html', txt:'华泰官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>27</td>
                                    <td>江淮</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.jac.com.cn/inservice.jspx?channelpath=dealers&jacmodel=%E7%91%9E%E9%A3%8EM3&jacbrand=', txt:'江淮官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>28</td>
                                    <td>吉利汽车</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://club.geely.com/plugin.php?id=szrq_fee:car&mod=service&subop=dealer', txt:'吉利汽车官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>29</td>
                                    <td>江铃</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.jmc.com.cn/chinese/server/saleand.asp', txt:'江铃官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>30</td>
                                    <td>Jeep</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.jeep.com.cn/dealer/', txt:'Jeep官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>31</td>
                                    <td>捷豹</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://dealer.jaguar.com.cn/', txt:'捷豹官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>32</td>
                                    <td>凯迪拉克</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.cadillac.com.cn/plus/delearsearch.html', txt:'凯迪拉克官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>33</td>
                                    <td>克莱斯勒</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.chrysler.com.cn/dealer.html', txt:'克莱斯勒官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>34</td>
                                    <td>铃木</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.suzuki-china.com/', txt:'铃木官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>35</td>
                                    <td>雷诺</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dongfeng-renault.com.cn/Province/shanghai/shanghai', txt:'雷诺官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>36</td>
                                    <td>林肯</td>
                                    <!-- <td><a v-link="{name:'third-party',query:{target:'http://www.lincoln.com.cn/dealer-network', txt:'林肯官网'}}" target="_blank">直达官网</a></td> -->
                                    <td><a href="http://www.lincoln.com.cn/dealer-network">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>37</td>
                                    <td>陆风</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.landwind.com/agency/', txt:'陆风官网'}}">直达官网</a></td>
                                    <!-- <td><a v-link="http://www.landwind.com/agency/">直达官网</a></td> -->
                                </tr>

                                <tr>
                                    <td>38</td>
                                    <td>雷克萨斯</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.lexus.com.cn/', txt:'雷克萨斯官网'}}">直达官网</a></td>
                                    <!-- <td><a v-link="http://www.lexus.com.cn/">直达官网</a></td> -->
                                </tr>
                                <tr>
                                    <td>39</td>
                                    <td>路虎</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.landrover.com.cn/dealer-locator.html', txt:'路虎官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>40</td>
                                    <td>MINI</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.minichina.com.cn/mini/cn/zh/dealer_locator/index.html', txt:'MINI官网'}}">直达官网</a></td>
                                </tr>
                                <tr>
                                    <td>41</td>
                                    <td>玛莎拉蒂</td>
                                    <!-- <td><a v-link="{name:'third-party',query:{target:'http://www.maserati.com.cn/maserati/cn/zh/index/dealer-locator.html', txt:'玛莎拉蒂官网'}}" target="_blank">直达官网</a></td> -->
                                    <td><a href="http://www.maserati.com.cn/maserati/cn/zh/index/dealer-locator.html">直达官网</a></td>
                                </tr>

                                 <tr>
                                    <td rowspan="2">42</td>
                                    <td>一汽马自达</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.faw-mazda.com/index.php/dealers/jxscx', txt:'一汽马自达官网'}}">直达官网</a></td>
                                </tr>

                                 <tr>
                                    <td>长安马自达</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.changan-mazda.com.cn/dealer', txt:'长安马自达官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>43</td>
                                    <td>纳智捷</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dfyl-luxgen.com/index.php/lifehouse', txt:'纳智捷官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>44</td>
                                    <td>奇瑞</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.chery.cn/buys/dealer', txt:'奇瑞官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>45</td>
                                    <td>起亚</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dyk.com.cn/dealers', txt:'起亚官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>46</td>
                                    <td>日产</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.dongfeng-nissan.com.cn/Nissan/buy/selection/find-dealer', txt:'日产官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>47</td>
                                    <td>荣威</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.roewe.com.cn/dealersearch/', txt:'荣威官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>48</td>
                                    <td>广汽三菱</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.gmmc.com.cn/', txt:'广汽三菱官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>49</td>
                                    <td>三菱（进口）</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.mitsubishi-motors.com.cn/dealer/index?service=sales', txt:'三菱（进口）官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>50</td>
                                    <td>东南三菱</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.lancer-family.com/service/dealer.php', txt:'东南三菱官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>51</td>
                                    <td>斯巴鲁</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.subaru-china.cn/shopping_guide/find_a_dealer.html', txt:'斯巴鲁官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>52</td>
                                    <td>斯柯达</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.skoda.com.cn/', txt:'斯柯达官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>53</td>
                                    <td>沃尔沃</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.volvocars.com/zh-cn/find-a-dealer', txt:'沃尔沃官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>54</td>
                                    <td>雪佛兰</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.chevrolet.com.cn/dealer/', txt:'雪佛兰官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>55</td>
                                    <td>现代</td>
                                    <td><a v-link="{name:'third-party',query:{target:'https://www.beijing-hyundai.com.cn/html/category/searchdealer.html', txt:'现代官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>56</td>
                                    <td>雪铁龙</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://4s.dongfeng-citroen.com.cn/', txt:'雪铁龙官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>57</td>
                                    <td>英菲尼迪</td>
                                    <!-- <td><a v-link="{name:'third-party',query:{target:'http://www.infiniti.com.cn/dealer-finder.html', txt:'英菲尼迪官网'}}" target="_blank">直达官网</a></td> -->
                                    <td><a href="http://www.infiniti.com.cn/dealer-finder.html">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>58</td>
                                    <td>中华</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.zhonghuacar.com/dealer-search', txt:'中华官网'}}">直达官网</a></td>
                                </tr>

                                <tr>
                                    <td>59</td>
                                    <td>众泰</td>
                                    <td><a v-link="{name:'third-party',query:{target:'http://www.zotye.com/service/locator.htm', txt:'众泰官网'}}">直达官网</a></td>
                                </tr>
                          </tbody>
                     </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style type="text/css">
.car-brand-site .mainautow{padding-top: 50px;}
.afs-pd2 {
    padding: 20px 0 10px;
}
.after-service{
    padding: 0 0 20px;
}
.after-service h2 {
    color: #309d7d;
    font-size: 0.8rem;
    font-weight: normal;
}
.after-service span{
    color: #008080;
    padding: 10px 0;
    display: block;
}
.after-service p,.after-service span{
    font-size: 0.8rem;
}
.after-service p{
    padding: 0 0 20px;
}
.after-service .table thead td {
    color: #23b6b2;
    font-size: 0.8rem;
    background-color: #e2e6ea;
    text-align: center;
    padding: 5px 0;
}
.after-service .table {
    width: 100%;
    background-color: #f1f9f7;
}
.article1 h3{
    font-size: 0.8rem;
    font-weight: normal;
}
.after-service .table tbody th {
    text-align: center;
    font-weight: normal;
    padding:5px;
}
.after-service .table tbody td {
    border:1px dashed #b9dfe2;
    border-width: 0 1px 1px 0;
    padding:10px 2px;
    font-size: 0.8rem;
    text-align: center;
}
.after-service .table tbody td:nth-of-type(3n),.after-service .table tbody td:nth-of-type(3n+1) {
    text-align: center;
}
.after-service .table tbody td:nth-of-type(3n+3) {
    border-right: 0
}
.afs-bg1 {
    background-color: #c5c6bc;
    color: #5b8398
}
.afs-bg2 {
    background-color: #6fa4a6;
    color: #fff
}
.afs-bg3 {
    background-color: #cadcda;
    color: #5b8398
}
.afs-bg4 {
    background-color: #ccc;
    color: #5b8398
}
</style>