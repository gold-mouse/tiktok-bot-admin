import { useEffect, useRef, useState } from "react"
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Stack,
    Modal,
    Box,
    Grid2 as Grid,
    Skeleton,
    useTheme,
    useMediaQuery,
    TextField,
    Divider,
    Typography,
    Tooltip
} from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { toast } from "react-toastify"

import { closeChromeAPI, fetch_usersAPI, loginAPI, searchAPI } from "./api"
import LoadingFallback from "./core/components/loading-component"

interface IRows {
    id: number
    username: string
}

export default function App() {
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.down("sm"))

    const firstLoad = useRef(true)

    const [rows, setRows] = useState<IRows[]>([])
    const [videoList, setVideosList] = useState<{ link: string; img: string; id: number; result: any }[]>([])
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [query, setQuery] = useState<string>("")
    const [commentText, setCommentText] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [loadedTemplates, setLoadedTemplates] = useState<any>({})

    const fetch_usernames = async () => {
        try {
            setLoading(true)
            const rowsData = await fetch_usersAPI()
            if (rowsData.status === true) {
                setRows(rowsData.data)
            }
        } catch (error: any) {
            toast.error(error?.message ?? "Something went wrong!")
        }
        setLoading(false)
    }

    const login = async (username_: string, password: string) => {
        if (username_ === "" || password === "") {
            return toast.error("Missing payload!")
        }
        try {
            setLoading(true)
            const res = await loginAPI({ username: username_.trim(), password })
            if (res.status) {
                toast.success("Success!")
                fetch_usernames()
                closeLoginModal()
            } else {
                toast.error(res.message)
            }
        } catch (error: any) {
            toast.error(error?.message ?? "Something went wrong!")
        }
        setLoading(false)
    }

    const closeChrome = async () => {
        if (username === "") {
            return toast.info("Select username to close chrome of it")
        }
        try {
            setLoading(true)
            const res = await closeChromeAPI(username)
            if (res.status) {
                toast.success("Success!")
                fetch_usernames()
                setUsername("")
                setConfirmModal(false)
            } else {
                toast.error(res.message)
            }
        } catch (error: any) {
            toast.error(error?.message ?? "Something went wrong!")
        }
        setLoading(false)
    }

    const searchVideos = async () => {
        if (username === "" || query === "") {
            return toast.error("Missing payload!")
        }
        setLoading(true)
        try {
            let res = await searchAPI({ keyword: query, username, comment: commentText })
            if (res.status === true) {
                setVideosList(res.data)
                toast.success("Success!")
            }
        } catch (error: any) {
            toast.error(error?.message ?? "Something went wrong!")
        }
        setLoading(false)
    }

    const handleClick = (username: string) => {
        setUsername(username)
        setVideosList([])
        setIsOpen(true)
    }

    const handleLoad = (id: string | number) => {
        setLoadedTemplates((prev: any) => ({ ...prev, [id]: true }))
    }

    const close = () => {
        setIsOpen(false)
        setLoadedTemplates({})
    }

    const closeLoginModal = () => {
        setUsername("")
        setPassword("")
        setLoginModal(false)
    }

    const makeMarkByCond = (cond: boolean) => {
        return cond ? " ✔️" : " ✖️"
    }

    useEffect(() => {
        const init = async () => {
            await fetch_usernames()
            firstLoad.current = false
        }
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns: GridColDef[] = [
        {
            field: "id",
            disableColumnMenu: true,
            sortable: false,
            flex: 0.1,
            headerName: "No",
        },
        {
            field: "username",
            disableColumnMenu: true,
            sortable: false,
            flex: 0.5,
            headerName: "Name",
        },
        {
            field: "ac",
            disableColumnMenu: true,
            sortable: false,
            flex: 0.4,
            headerName: "Action",
            align: "center",
            renderCell: ({ row }) => (
                <Button
                    fullWidth={isXs}
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => handleClick(row.username)}
                >
                    Run
                </Button>
            ),
        },
    ]

    console.log(videoList)
    
    return (
        <>
            {
                loading && <LoadingFallback />
            }
            <Card sx={{ height: "100vh" }}>
                <CardHeader title="Tiktok Accounts Management" sx={{ cursor: "pointer" }} />
                <CardContent>
                    <Stack
                        flexDirection={{ md: "row", sx: "column" }}
                        alignItems="center"
                        justifyContent="space-between"
                        mb={5}
                    >
                        <Stack flexDirection="row" alignItems="center" gap={2}>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ color: "white" }}
                                onClick={() => {
                                    if (username === "") {
                                        return toast.info("Select username to close chrome of it")
                                    }
                                    setConfirmModal(true)
                                }}
                            >
                                Close Chrome
                            </Button>
                        </Stack>
                        <Button
                            variant="contained"
                            color="info"
                            sx={{ color: "#fff" }}
                            onClick={() => setLoginModal(true)}
                        >
                            Add Account
                        </Button>
                    </Stack>
                    <Stack alignItems="center">
                        <Box width={"50%"}>
                            <DataGrid
                                paginationMode="client"
                                style={{ height: "75vh" }}
                                rows={rows}
                                columns={columns}
                                onRowClick={(params) => setUsername(params.row.username)}
                                sx={{
                                    "& .MuiDataGrid-cell:focus": {
                                        outline: "none",
                                        border: "none",
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            <Modal
                open={isOpen}
                onClose={close}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Card
                    sx={{
                        maxWidth: "75vw",
                        width: "75vw",
                        maxHeight: "75vh",
                        overflow: "hidden auto",
                    }}
                >
                    <CardHeader
                        title={isXs ? "Template" : "Select Template "}
                        slotProps={{
                            title: {
                                sx: {
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },
                            },
                        }}
                    />
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid size={8}>
                                <Stack flexDirection="row" alignItems="center" gap={2}>
                                    <TextField
                                        onKeyUp={(e) => e.key === "Enter" && searchVideos()}
                                        size="small"
                                        placeholder="keywords..."
                                        fullWidth
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <TextField
                                        onKeyUp={(e) => e.key === "Enter" && searchVideos()}
                                        size="small"
                                        placeholder="separate with commas for multiple comments..."
                                        fullWidth
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <Button
                                        color="success"
                                        variant="contained"
                                        sx={{ color: "#fff", px: 3 }}
                                        onClick={searchVideos}
                                    >
                                        Search
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 5 }} />
                        <Grid container spacing={5}>
                            {videoList.map(
                                (video) => (
                                    <Grid
                                        key={video.id}
                                        size={{ lg: 2, md: 2, sm: 4, xs: 6 }}
                                        sx={{
                                            ":active": {
                                                opacity: 0.7,
                                            },
                                        }}
                                    >
                                        <Stack
                                            display={
                                                loadedTemplates[video.id] ? "block" : "none"
                                            }
                                        >
                                            <Box
                                                component="img"
                                                src={video.img}
                                                style={{
                                                    width: "100%",
                                                    height: "150px",
                                                    pointerEvents: "none",
                                                }}
                                                onLoad={() => handleLoad(video.id)}
                                            />
                                            <Tooltip
                                                title={
                                                    video.result?.message ??
                                                    `Heart: ${makeMarkByCond(video.result?.data?.heart)} Favorite: ${makeMarkByCond(video.result?.data?.favorite)} Comment: ${makeMarkByCond(video.result?.data?.comment)}`
                                                }
                                            >
                                                <Button fullWidth variant="outlined" color="success">
                                                    Done&nbsp; <Typography mb={0.5}>{video.result?.success ? " ✔️" : " ✖️"}</Typography>
                                                </Button>
                                            </Tooltip>
                                        </Stack>
                                        {!loadedTemplates[video.id] && (
                                            <>
                                                <Skeleton
                                                    height="150px"
                                                    animation="wave"
                                                    variant="rectangular"
                                                />
                                                <Skeleton
                                                    height="35px"
                                                    animation="wave"
                                                    variant="rectangular"
                                                />
                                            </>
                                        )}
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
            <Modal
                open={loginModal}
                onClose={closeLoginModal}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Card
                    sx={{
                        maxWidth: "75vw",
                        width: "30vw",
                        maxHeight: "75vh",
                        overflow: "hidden auto",
                    }}
                >
                    <CardHeader
                        title={isXs ? "Account" : "Username or Email & Password"}
                        slotProps={{
                            title: {
                                sx: {
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },
                            },
                        }}
                    />
                    <CardContent>
                        <Stack rowGap={5}>
                            <TextField
                                placeholder="Username or email"
                                onChange={(e) => setUsername(e.target.value)}
                                size="small"
                            />
                            <TextField
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                size="small"
                                type="password"
                                onKeyUp={(e) => e.key === "Enter" && login(username, password)}
                            />
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                                <Button variant="outlined" onClick={closeLoginModal}>Cancel</Button>
                                <Button variant="contained" color="success" onClick={() => login(username, password)} sx={{ color: "#fff" }}>Login</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Modal>
            <Modal
                open={confirmModal}
                onClose={() => setConfirmModal(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Card
                    sx={{
                        maxWidth: "75vw",
                        width: "30vw",
                        maxHeight: "75vh",
                        overflow: "hidden auto",
                    }}
                >
                    <CardHeader
                        title={isXs ? "Confirm" : "Are you sure?"}
                        slotProps={{
                            title: {
                                sx: {
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },
                            },
                        }}
                    />
                    <CardContent>
                        <Stack rowGap={5} >
                            <Typography component="h3">Are you sure to remove {username}?</Typography>
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                                <Button variant="outlined" onClick={() => setConfirmModal(false)}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={() => closeChrome()} sx={{ color: "#fff" }}>Close Chrome</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}
