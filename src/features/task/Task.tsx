import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip, ArrowLeft, ArrowRight } from "react-feather";
import styles from "./Task.module.scss"

const Task = () => {
    return (
        <div className={styles.taskPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Task Dashboard</h1>
                    <p className={styles.pageSubtitle}>Kanban workflow tracking and task management</p>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.addBtn} >
                        <Plus size={16} />
                        Create Task
                    </button>
                </div>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.filterLeft}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Project:</span>
                        <button className={styles.filterSelect}>
                            All Projects
                        </button>
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Assignee:</span>
                        <button className={styles.filterSelect}>
                            All Assignees
                        </button>
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Priority:</span>
                        <button className={styles.filterSelect}>
                            All Priorities
                        </button>
                    </div>
                </div>
                <div className={styles.filterRight}>
                    Showing 5 active tasks
                </div>
            </div>

            <div className={styles.taskBoard}>
                {/* TODO Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.todo}`}></div>
                            <h4>To Do</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Design System Update</h5>
                            <p className={styles.cardDesc}>Update the core component library to match the new branding guidelines.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 24</span></div>
                                    <div className={styles.metaItem}><MessageSquare size={14} /><span>3</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>User Research Analysis</h5>
                            <p className={styles.cardDesc}>Compile notes from the Q3 user interviews and create a summary deck.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 28</span></div>
                                    <div className={styles.metaItem}><Paperclip size={14} /><span>2</span></div>
                                </div>
                                <div className={styles.avatar}>AM</div>
                            </div>
                        </div>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Design System Update</h5>
                            <p className={styles.cardDesc}>Update the core component library to match the new branding guidelines.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 24</span></div>
                                    <div className={styles.metaItem}><MessageSquare size={14} /><span>3</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>User Research Analysis</h5>
                            <p className={styles.cardDesc}>Compile notes from the Q3 user interviews and create a summary deck.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 28</span></div>
                                    <div className={styles.metaItem}><Paperclip size={14} /><span>2</span></div>
                                </div>
                                <div className={styles.avatar}>AM</div>
                            </div>
                        </div>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Design System Update</h5>
                            <p className={styles.cardDesc}>Update the core component library to match the new branding guidelines.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 24</span></div>
                                    <div className={styles.metaItem}><MessageSquare size={14} /><span>3</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>User Research Analysis</h5>
                            <p className={styles.cardDesc}>Compile notes from the Q3 user interviews and create a summary deck.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 28</span></div>
                                    <div className={styles.metaItem}><Paperclip size={14} /><span>2</span></div>
                                </div>
                                <div className={styles.avatar}>AM</div>
                            </div>
                        </div>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Design System Update</h5>
                            <p className={styles.cardDesc}>Update the core component library to match the new branding guidelines.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 24</span></div>
                                    <div className={styles.metaItem}><MessageSquare size={14} /><span>3</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>User Research Analysis</h5>
                            <p className={styles.cardDesc}>Compile notes from the Q3 user interviews and create a summary deck.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 28</span></div>
                                    <div className={styles.metaItem}><Paperclip size={14} /><span>2</span></div>
                                </div>
                                <div className={styles.avatar}>AM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.inProgress}`}></div>
                            <h4>In Progress</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Backend API Migration</h5>
                            <p className={styles.cardDesc}>Migrate the legacy endpoints to the new GraphQL architecture.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 25</span></div>
                                </div>
                                <div className={styles.avatar}>SW</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.low}`}>Low Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Update Documentation</h5>
                            <p className={styles.cardDesc}>Add missing JSDoc comments to the core utility functions.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Nov 02</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* IN PROGRESS Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.inProgress}`}></div>
                            <h4>In Progress</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Backend API Migration</h5>
                            <p className={styles.cardDesc}>Migrate the legacy endpoints to the new GraphQL architecture.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 25</span></div>
                                </div>
                                <div className={styles.avatar}>SW</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.low}`}>Low Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Update Documentation</h5>
                            <p className={styles.cardDesc}>Add missing JSDoc comments to the core utility functions.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Nov 02</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.inProgress}`}></div>
                            <h4>In Progress</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Backend API Migration</h5>
                            <p className={styles.cardDesc}>Migrate the legacy endpoints to the new GraphQL architecture.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 25</span></div>
                                </div>
                                <div className={styles.avatar}>SW</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.low}`}>Low Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Update Documentation</h5>
                            <p className={styles.cardDesc}>Add missing JSDoc comments to the core utility functions.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Nov 02</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.inProgress}`}></div>
                            <h4>In Progress</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Backend API Migration</h5>
                            <p className={styles.cardDesc}>Migrate the legacy endpoints to the new GraphQL architecture.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 25</span></div>
                                </div>
                                <div className={styles.avatar}>SW</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.low}`}>Low Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Update Documentation</h5>
                            <p className={styles.cardDesc}>Add missing JSDoc comments to the core utility functions.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Nov 02</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.inProgress}`}></div>
                            <h4>In Progress</h4>
                            <span className={styles.taskCount}>2</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.high}`}>High Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Backend API Migration</h5>
                            <p className={styles.cardDesc}>Migrate the legacy endpoints to the new GraphQL architecture.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 25</span></div>
                                </div>
                                <div className={styles.avatar}>SW</div>
                            </div>
                        </div>

                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.low}`}>Low Priority</span>
                            </div>
                            <h5 className={styles.cardTitle}>Update Documentation</h5>
                            <p className={styles.cardDesc}>Add missing JSDoc comments to the core utility functions.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Nov 02</span></div>
                                </div>
                                <div className={styles.avatar}>JD</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* DONE Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.done}`}></div>
                            <h4>Completed</h4>
                            <span className={styles.taskCount}>1</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>Authentication Flow</h5>
                            <p className={styles.cardDesc}>Implement OAuth2 login with Google and GitHub providers.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 20</span></div>
                                </div>
                                <div className={styles.avatar}>TR</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cancelled Column */}
                <div className={styles.taskColumn}>
                    <div className={styles.columnHeader}>
                        <div className={styles.headerTitle}>
                            <div className={`${styles.statusDot} ${styles.done}`}></div>
                            <h4>Cancelled</h4>
                            <span className={styles.taskCount}>1</span>
                        </div>
                        <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                    </div>

                    <div className={styles.taskList}>
                        <div className={styles.taskCard}>
                            <div className={styles.cardLabels}>
                                <span className={`${styles.label} ${styles.medium}`}>Medium</span>
                            </div>
                            <h5 className={styles.cardTitle}>Authentication Flow</h5>
                            <p className={styles.cardDesc}>Implement OAuth2 login with Google and GitHub providers.</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.footerLeft}>
                                    <div className={styles.metaItem}><Clock size={14} /><span>Oct 20</span></div>
                                </div>
                                <div className={styles.avatar}>TR</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div className={styles.paginationFooter}>
                <div className={styles.paginationInfo}>
                    Showing 1 to 3 of 100 items
                </div>

                <div className={styles.paginationControls}>
                    <span className={styles.pageText}>
                        Page 1 of 3
                    </span>

                    <button
                        className={styles.paginationBtn}
                    // onClick={() => table.previousPage()}
                    // disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeft size={16} />
                        Previous
                    </button>

                    <button
                        className={styles.paginationBtn}
                    // onClick={() => table.nextPage()}
                    // disabled={!table.getCanNextPage()}
                    >
                        Next
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Task;