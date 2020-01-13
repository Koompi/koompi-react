import React from 'react';
import { Typography, Divider } from 'antd';
import { Tabs } from 'antd';
import Navbar from './Navbar';
import { Row, Col } from 'antd';
import { List } from 'antd';
const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const title = [
	{
		id: 1,
		title: 'Processor',
		des: 'Intel® Core™ i7 7500U Processor'
	},
	{
		id: 2,
		title: 'Operating System',
		des: 'KOOMPI OS'
	},
	{
		id: 3,
		title: 'Memory',
		des: 'up to 16 GB SDRAM(Optional)'
	},
	{
		id: 4,
		title: 'Display',
		des: 'FHD-Anti-Glare'
	},
	{
		id: 5,
		title: 'Graphic',
		des: 'NVIDIA® GeForce® MX150 , with 2GB GDDR5 VRAM'
	},
	{
		id: 6,
		title: 'Keyboard',
		des: '256SSD SATA 3.0 M.2 SSD'
	},
	{
		id: 7,
		title: 'Storage',
		des: 'Chiclet keyboardIlluminated chiclet keyboard(On selected models)'
	},
	{
		id: 8,
		title: 'WebCam',
		des: 'VGAWebcam'
	},
	{
		id: 9,
		title: 'Audio',
		des: 'Built-in 2 W Stereo Speaker with Microphone'
	},
	{
		id: 10,
		title: 'Battery',
		des: '3 -Cell 42 Wh Battery'
	},
	{
		id: 11,
		title: 'Weight',
		des: '1.5 kg ~ 1.7 kg with battery'
	},
	{
		id: 12,
		title: 'Security',
		des: 'BIOS user password protection HDD user password protection'
	}
];
function KoompiE11() {
	function callback(key) {
		console.log(key);
	}
	return (
		<React.Fragment>
			<Navbar />
			<div className='background-color'>
				<Tabs defaultActiveKey='1' onChange={callback}>
					<TabPane tab='Overview' key='1'>
						<div>
							{/*=========== banner-koompiE11========== */}
							<div className='container'>
								<center>
									<Typography>
										<Title className='KoompiE11' level={2}>
											KOOMPI E11
										</Title>
										<Title className='subTittle-E11'>
											Open New Horizons
										</Title>
									</Typography>
								</center>
								<img
									className='banner-overview-koompiE11'
									src='/img/Macbook.png'
								/>
							</div>
							{/*============== Display KoompiE11========== */}
							<div className='container margin-display-koompiE11'>
								<div>
									<Typography className='text-container'>
										<Title className='Title-Display-koompiE11'>
											FHD IPS Anti-glare Panel
										</Title>
										<Paragraph className='text-Display-koompiE11'>
											KOOMPI E11 works out-of-the-box with
											a full suite of custom-selected
											software packages needed for
											everyday computing. Check out our
											features for the fine details.
										</Paragraph>
									</Typography>
									<center>
										<img
											className='banner-overview-display-koompiE11'
											src='/img/Macbook.png'></img>
									</center>
									<div className='text-container'>
										{/* <Row>
                      <Col sm={12}>
                        <div>
                          <Typography>
                            <Title>13.3</Title>
                            <Paragraph>
                              high-resolution<br></br> Retina display
                            </Paragraph>
                          </Typography>
                        </div>
                      </Col>
                      <Col sm={12}>Col</Col>
                    </Row>
                    <Row>
                      <Col sm={12}>Col</Col>
                      <Col sm={12}>Col</Col>
                    </Row> */}
										<Row gutter={[48, 0]}>
											<Col sm={12}>
												<Paragraph className='text-Display-koompiE11'>
													KOOMPI E11 works
													out-of-the-box with a full
													suite of custom-selected
													software packages needed for
													everyday computing. Check
													out our features for the
													fine details.
												</Paragraph>
											</Col>
											<Col sm={12}>
												<Row>
													<Col span={12}>
														<div>
															<Typography>
																<Title className='title-Display-Descrip'>
																	13.3
																</Title>
																<Paragraph className='text-show-all-Display'>
																	high-resolution
																	<br></br>{' '}
																	Retina
																	display
																</Paragraph>
															</Typography>
														</div>
													</Col>
													<Col span={12}>
														<div>
															<img
																className='sunIcon-Display'
																src='/img/icons8-sun-80.png'
															/>
															<Paragraph className='text1-show-all-Display'>
																True Tone{' '}
																<br></br>
																Technology
															</Paragraph>
														</div>
													</Col>
												</Row>
												<Row>
													<Col span={12}>
														<div>
															<img
																className='sunIcon-Display'
																src='/img/icons8-a-50.png'
															/>
															<Paragraph className='text1-show-all-Display'>
																Razor-sharp
																<br></br>
																text clarity
															</Paragraph>
														</div>
													</Col>
													<Col span={12}>
														<div>
															<Typography>
																<Title className='title-Display-Descrip'>
																	48%
																</Title>
																<Paragraph className='text-show-all-Display'>
																	high-resolution
																	<br></br>{' '}
																	Retina
																	display
																</Paragraph>
															</Typography>
														</div>
													</Col>
												</Row>
											</Col>
										</Row>
									</div>
								</div>
							</div>
							{/*======== Performand-koompiE11 =======*/}
							<div className='container margin-performence-koompiE11'>
								<div>
									<Typography className='text-container'>
										<Title className='title-performance-koompiE11'>
											Your all‑purpose, all‑day KOOMPIE11.
										</Title>
										<Paragraph className='text-performence-koompiE11'>
											Even though it weighs just 2.75
											pounds, the new MacBook Air packs
											quite a punch. An eighth-generation
											Intel Core i5 processor helps you
											power through daily activities, from
											reading email and browsing the web
											to creating Keynote presentations
											and editing in iMovie. Up to 16GB of
											memory lets you work seamlessly even
											with multiple apps open, while up to
											1TB of SSD storage lets you launch
											apps in a flash and provides plenty
											of room for all your documents,
											photos, and videos.
										</Paragraph>
									</Typography>
								</div>
								<div>
									<img
										className='banner-Performance-koompiE11'
										src='/img/Macbook.png'></img>
								</div>
								<div className='text-container'>
									<Row>
										<Col span={8}>
											<div>
												<Typography>
													<Title className='title-performance-koompiE11-descrip'>
														16 <span>GB</span>
													</Title>
													<Paragraph className='text-performence-koompiE11-descrip'>
														memory
													</Paragraph>
												</Typography>
											</div>
										</Col>
										<Col span={8}>
											<div>
												<Typography>
													<Title className='title-performance-koompiE11-descrip'>
														1T <span></span>
													</Title>
													<Paragraph className='text-performence-koompiE11-descrip'>
														SSD Storage
													</Paragraph>
												</Typography>
											</div>
										</Col>
										<Col span={8}>
											<div>
												<Typography>
													<Title className='title-performance-koompiE11-descrip'>
														2.75 <span>Lb</span>
													</Title>
													<Paragraph className='text-performence-koompiE11-descrip'>
														light
													</Paragraph>
												</Typography>
											</div>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<div>
												<Typography>
													<Title className='title-performance-koompiE11-descrip'>
														15.6 <span>mm</span>
													</Title>
													<Paragraph className='text-performence-koompiE11-descrip'>
														memory
													</Paragraph>
												</Typography>
											</div>
										</Col>
										<Col span={8}>
											<div>
												<img
													className='Icon-performence-koompiE11'
													src='/img/icons8-microchip-50.png'></img>
												<Typography>
													<Paragraph className='text-performence-koompiE11-descripOfIcon'>
														Eighth-generation{' '}
														<br></br> Intel Core i5
														<br></br>
														processor
													</Paragraph>
												</Typography>
											</div>
										</Col>
										<Col span={8}>
											<div>
												<img
													className='Icon-performence-koompiE11'
													src='/img/icons8-wi-fi-48.png'></img>
												<Typography>
													<Paragraph className='text-performence-koompiE11-descripOfIcon'>
														802.11ac Wi-Fi and{' '}
														<br></br> Bluetooth 4.2
													</Paragraph>
												</Typography>
											</div>
										</Col>
									</Row>
								</div>
								<div className='text-container'>
									<div className='border-battery'>
										<img
											className='IconBatter-of-koompiE11'
											src='/img/icons8-charging-battery-50.png'></img>
										<Paragraph className='text-battery-koompiE11'>
											With up to 12 hours of battery life,
											KOOMPI E is your day‑in, day‑out
											dynamo. Check email, browse the web,
											shop online, write documents, watch
											videos, manage spreadsheets, and
											more, all without plugging in.
											Taking a transatlantic flight? Line
											up the movies, because MacBook Air
											is ready to play for up to 13 hours
											— nonstop.2
										</Paragraph>
									</div>
								</div>
							</div>
						</div>
						<div className=' container boss-of-slim-koompiE'>
							<div className='text-container'>
								<Typography>
									<Title className='header-of-slim'>
										Chic, incredibly portable.
									</Title>
									<Paragraph className='text-of-slim'>
										A professional notebook that's also
										portable. The elegant metallic body with
										perfect diamond cutting and sandblast
										finishing is just 14.6 mm thin and
										weighs only 1.33 kg. Comfortable to take
										it anywhere for work or entertainment.
									</Paragraph>
								</Typography>
								<div className='text-container'>
									<Row>
										<Col span={12}>
											<div>
												<Title className='title-of-slim'>
													14.6 <span>mm</span>
												</Title>
												<Paragraph className='p-of-slim'>
													Thin
												</Paragraph>
											</div>
										</Col>
										<Col span={12}>
											<div>
												<Title className='title-of-slim'>
													1.33 <span>kg</span>
												</Title>
												<Paragraph className='p-of-slim'>
													Light
												</Paragraph>
											</div>
										</Col>
									</Row>
								</div>
							</div>
							<div>
								<center>
									<img
										style={{ maxWidth: '100%' }}
										src='/img/slimmacbook.webp'
									/>
								</center>
							</div>
						</div>
					</TabPane>

					{/* =================Spec============= */}
					<TabPane tab='Spec' key='2'>
						<div className='spec-background'>
							<div className='container'>
								<List
									itemLayout='horizontal'
									dataSource={title}
									renderItem={item => (
										<List.Item>
											<div className=' spec-grid'>
												<Row>
													<Col sm={12}>
														<h2
															style={{
																fontSize: '38px'
															}}>
															{item.title}
														</h2>
													</Col>
													<Col sm={12}>
														<p
															style={{
																fontSize: '26px'
															}}>
															{item.des}
														</p>
													</Col>
												</Row>
											</div>
										</List.Item>
									)}
								/>
							</div>
						</div>
					</TabPane>
				</Tabs>
			</div>
		</React.Fragment>
	);
}

export default KoompiE11;
