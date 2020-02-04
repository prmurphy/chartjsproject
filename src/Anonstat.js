import React from 'react';
import { Doughnut, Pie, Bar, Polar, Line, Bubble, Scatter, HorizontalBar } from 'react-chartjs-2';
import { Carousel, Layout, Row, Select, Col } from 'antd';
import { DailyCallIns } from './Statistics/DailyCallIns';
const {Content, Footer} = Layout;
const {Option} = Select;

export class AnonymousStat extends React.Component
{
    constructor(props)
    {
        super(props);
//POS, EMS, PAWS, RS, RL, EDI

        this.state =
        {
            domain: (window.location.href.startsWith('http://localhost:')) ? 'http://localhost:8088/ACI' : 'http://osec2003029/ACI',  
            data: [],
            currSelection: this.getTeamLabels(),
            perTeamDaily:{}
            // {
            //     labels: ['Call Ins Per Team (Daily)'],                
            //     datasets: [{
            //         label: 'POS',
            //         fill: false,
            //         backgroundColor: this.getTeamColor('POS')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('POS')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: []
            //     },
            //     {
            //         label: 'EMS',
            //         backgroundColor: this.getTeamColor('EMS')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('EMS')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: [Math.floor(Math.random() * 16)]
            //     },
            //     {
            //         label: 'PAWS',
            //         backgroundColor: this.getTeamColor('PAWS')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('PAWS')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: [Math.floor(Math.random() * 16)]
            //     },
            //     {
            //         label: 'RS',
            //         backgroundColor: this.getTeamColor('RS')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('RS')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: [Math.floor(Math.random() * 16)]
            //     },
            //     {
            //         label: 'RL',
            //         backgroundColor: this.getTeamColor('RL')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('RL')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: [Math.floor(Math.random() * 16)]
            //     },
            //     {
            //         label: 'EDI',
            //         backgroundColor: this.getTeamColor('EDI')[0],
            //         borderColor: 'rgba(255,99,132,1)',
            //         borderWidth: 1,
            //         hoverBackgroundColor: this.getTeamColor('EDI')[1],
            //         hoverBorderColor: 'rgba(255,99,132,1)',
            //         data: [Math.floor(Math.random() * 16)]
            //     }]
            // },
            
           
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getReportLabels = () => ['Late Arrivals', 'Early Departures', 'Absent', 'NCNS'];

    getTeamLabels = () => ['POS', 'EMS', 'PAWS', 'RS', 'RL', 'EDI'];

    getTeamColor = (Team) =>
    {
        switch(Team)
        {
            case 'POS': return ['#84A59D', '#C7D6D2'];
            case 'EMS': return ['#F28482', '#F9C7C6'];
            case 'PAWS': return ['#F5CAC3', '#FAE6E3'];
            case 'RS' : return ['#F7EDE2', '#FBF6F1'];
            case 'RL' : return ['#8B95C9', '#CACEE6'];
            case 'EDI' : return ['#F6BD60', '#FAE1B6'];
            default: return [this.getRandomColor(), this.getRandomColor()]
        }
    }

    handleChange = value =>
    {
        if(value.includes('ALL'))
        {
            if(this.getTeamLabels().every(curr => value.includes(curr)))
            {
                this.setState({currSelection: []})
            }
            else
            {
                this.setState({currSelection: this.getTeamLabels()})
            }
        }
        else
        {
            this.setState({currSelection: value})
        }
    }
    
    componentDidMount() {
        this.handleHistoryFetch()
        console.log("Compant did mount")
        console.log("perTeamDaily: " + this.state.perTeamDaily)
        
    }

    handleHistoryFetch = () => {
        console.log('loading history');
        fetch(`${this.state.domain}/getallevents`,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            
            .then(Data => Data.json())
            .then(Data => {
                console.log("hello");
                console.log("data: " + Data);
                this.setState({perTeamDaily: Data});
            });
    };



    render()
    {
        return(
            <Layout>
                <Content style={{margin: '24px'}}>
                    
                    <div style={{width: '500px', float: 'left'}}>
                        <Bar
                            data={this.state.perTeamDaily}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: false
                                }
                            }}
                        />
                    </div>
                    
                                        
                </Content>
                <Footer style={{position: "sticky", bottom: '0vh', margin: '0px', padding: '0px', background: '#00152A'}}>
                    <DailyCallIns/>
                </Footer>
            </Layout>
        )
    }
}
